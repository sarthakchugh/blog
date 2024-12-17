const User = require('../models/user.model');

const getSavedPosts = async (req, res, next) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ clerkId: clerkUserId }).populate(
        'savedPosts',
        'cover_image title category description slug user createdAt'
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const savedPosts = user.savedPosts.map(async (post) => {
        return {
            _id: post._id,
            cover_image: post.cover_image,
            title: post.title,
            category: post.category,
            description: post.description,
            slug: post.slug,
            user: await User.findOne({ _id: post.user }).select('username'),
            createdAt: post.createdAt,
        };
    });

    res.status(200).json({ savedPosts: await Promise.all(savedPosts) });
};

const savePost = async (req, res, next) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ clerkId: clerkUserId });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const postId = req.body.postId;
    const isSaved = user.savedPosts.some((post) => post.toString() === postId);
    if (!isSaved) {
        await User.findOneAndUpdate(user._id, { $push: { savedPosts: postId } });
    } else {
        await User.findOneAndUpdate(user._id, { $pull: { savedPosts: postId } });
    }

    setTimeout(() => {
        res.status(200).json(
            isSaved ? { message: 'Post removed from saved posts' } : { message: 'Post saved successfully' }
        );
    }, 1000);
};

module.exports = {
    getSavedPosts,
    savePost,
};
