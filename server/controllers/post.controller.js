const ImageKit = require('imagekit');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const getAllPosts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const category = req.query.category;
    const search = req.query.search;
    const sort = req.query.sort;
    const author = req.query.author;
    const featured = req.query.featured;

    const query = {};

    if (category) {
        query.category = category;
    }
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    if (author) {
        const user = await User.findOne({ username: author }).select('_id');
        if (!user) {
            return res.status(404).json({ message: 'No posts found' });
        }
        query.user = user._id;
    }
    if (featured) {
        query.isFeatured = true;
    }

    let sortObj = { createdAt: -1 };

    if (sort) {
        switch (sort) {
            case 'newest':
                sortObj = { createdAt: -1 };
                break;
            case 'oldest':
                sortObj = { createdAt: 1 };
                break;
            case 'popular':
                sortObj = { visitors: -1 };
                break;
            case 'trending':
                sortObj = { visitors: -1 };
                query.createdAt = {
                    $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                };
            default:
                break;
        }
    }

    const posts = await Post.find(query)
        .sort(sortObj)
        .populate('user', 'username')
        .skip((page - 1) * limit)
        .limit(limit);

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
};

const getPostById = async (req, res, next) => {
    const slug = req.params.slug;

    const post = await Post.findOne({ slug: slug }).populate('user', 'username image');

    res.status(200).json({ post });
};

const createPost = async (req, res, next) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { cover_image, title, description, content, category } = req.body;

    if (!title || !description || !content || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate a unique slug and check if it already exists
    let slug = title.toLowerCase().replace(/ /g, '-');
    let existingPost = await Post.findOne({ slug });
    let counter = 2;
    while (existingPost) {
        slug = `${slug}-${counter}`;
        existingPost = await Post.findOne({ slug });
        counter++;
    }

    const post = new Post({
        cover_image,
        title,
        slug,
        description,
        content,
        category,
        user: user._id,
    });

    await post.save();
    res.status(201).json({
        message: 'Post created successfully',
        post,
    });
};

const deletePost = async (req, res, next) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    const id = req.params.id;

    if (role === 'admin') {
        const deletedPost = await Post.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'Post deleted successfully',
            post: deletedPost,
        });
    }

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedPost = await Post.findOneAndDelete({
        _id: id,
        user: user._id,
    });

    if (!deletedPost) {
        return res.status(403).json({ message: 'You are not allowed to delete this post' });
    } else {
        setTimeout(() => {
            res.status(200).json({
                message: 'Post deleted successfully',
                post: deletedPost,
            });
        }, 1000);
    }
};

const featurePost = async (req, res, next) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    const role = req.auth.sessionClaims?.metadata?.role || 'user';

    const { postId } = req.body;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can feature a post.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    post.isFeatured = !post.isFeatured;
    await post.save();

    if (post.isFeatured) {
        setTimeout(() => {
            res.status(200).json({ message: 'Post featured successfully' });
        }, 1000);
    } else {
        setTimeout(() => {
            res.status(200).json({ message: 'Post removed from featured posts.' });
        }, 1000);
    }
};

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadAuth = async (req, res, next) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    featurePost,
    uploadAuth,
};
