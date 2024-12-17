const Comment = require('../models/comment.model');
const User = require('../models/user.model');

const getAllComments = async (req, res, next) => {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId }).populate('user', 'username image').sort({
        createdAt: -1,
    });

    res.status(200).json({ comments });
};

const createComment = async (req, res, next) => {
    const postId = req.params.postId;
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { content } = req.body;
    const comment = new Comment({
        content,
        user: user._id,
        post: postId,
    });
    await comment.save();

    setTimeout(() => {
        res.status(200).json({ message: 'Comment created successfully', comment });
    }, 2000);
};

const deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId;
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    if (role === 'admin') {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        return setTimeout(() => {
            res.status(200).json({
                message: 'Comment deleted successfully',
                comment: deletedComment,
            });
        }, 2000);
    }

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const comment = await Comment.findOneAndDelete({ _id: commentId, user: user._id });
    if (!comment) {
        return setTimeout(() => {
            res.status(403).json({ message: 'You are not allowed to delete this comment' });
        }, 1000);
    } else {
        return setTimeout(() => {
            res.status(200).json({ message: 'Comment deleted successfully', comment });
        }, 1000);
    }
};

module.exports = {
    getAllComments,
    createComment,
    deleteComment,
};
