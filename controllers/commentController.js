const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user, body } = req.body;

        //create comment object
        const comment = new Comment({ post, user, body });

        //save comment to the db
        const savedComment = await comment.save();

        //update the post collection with the comments
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            .populate("comments")//populate comments array with comment documents
            .exec();

        res.json({
            post: updatedPost
        })
    }
    catch (error) {
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