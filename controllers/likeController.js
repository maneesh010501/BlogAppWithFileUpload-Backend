const Post = require('../models/Post');
const Like = require('../models/Like');

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        const like = new Like({ post, user });

        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            post: updatedPost
        })
    }
    catch (err) {
        console.error(error);
        res.status(500).json(
            {
                success: false,
                data: "internal server error",
                message: error.message
            }
        )
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        await Like.findByIdAndDelete(like);

        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: like } }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            post: updatedPost
        })
    }
    catch (err) {
        console.error(error);
        res.status(500).json(
            {
                success: false,
                data: "internal server error",
                message: error.message
            }
        )
    }
}