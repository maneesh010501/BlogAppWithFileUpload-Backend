const Post = require("../models/Post");
const cloudinary = require('cloudinary').v2;

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };

    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.createPost = async (req, res) => {
    try {
        const { name, description, email } = req.body;
        console.log(name, description, email);

        const file = req.files.imageFile;
        console.log("file : ", file);

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Image format not supported'
            })
        }

        const response = await uploadFileToCloudinary(file, 'blogApp');
        console.log("response : ", response);

        const post = await Post.create({ name, description, email, imageUrl: response.secure_url });

        res.status(200).json(
            {
                success: true,
                data: post,
                message: 'Created post successfully'
            }
        )
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

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('likes').populate('comments').exec();
        res.status(200).json({
            success: true,
            data: posts,
            message: 'All Posts fetched successfully'
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message
        })
    }
}

exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById({ _id: id });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "no post is found with given id"
            })
        }

        else {
            res.status(200).json({
                success: true,
                data: post,
                message: `Post with id ${id} fetched successfully`
            })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: 'Internal server error',
            message: error.message
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            { title, description },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: 'Updated post successfully'
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "post not updated",
            message: err.message
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);

        await Like.deleteMany({ post: id })
        await Comment.deleteMany({ post: id })

        res.status(200).json({
            success: true,
            data: "post deleted successfully"
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "post not deleted",
            message: err.message
        })
    }
}
