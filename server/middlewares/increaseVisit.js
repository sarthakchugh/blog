const Post = require('../models/post.model');

const increaseVisit = async (req, res, next) => {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug: slug });
    post.visitors += 1;
    await post.save();
    next();
};

module.exports = increaseVisit;
