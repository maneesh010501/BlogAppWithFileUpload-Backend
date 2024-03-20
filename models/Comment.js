// import mongoose
const mongoose = require('mongoose');

// route handler
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" //reference to post model
    },
    user: {
        type: String,
        required: true
    },  
    body: {
        type: String,
        required: true
    }
});

// export
module.exports = mongoose.model('Comment', commentSchema); //collection name in db will come here.

// 1.Default Collection Name:
// By default, Mongoose will use the plural, lowercase version of the model name as the collection name. For example, if you define a model named Comment like this:
// module.exports = mongoose.model('Comment', commentSchema); //collection name in db will come here.

//2.Explicitly Specifying Collection Name:
// If you want to use a different collection name, you can specify it as the third argument when creating the model. For example:
// module.exports = mongoose.model('Comment', commentSchema, 'custom_comments');
// In this case, Mongoose will use the collection named custom_comments in the MongoDB database.

// 3.Accessing Collection Name:
// You can access the name of the collection associated with a Mongoose model using the collection property. For example:
// const Comment = mongoose.model('Comment', commentSchema);
// console.log(Comment.collection.name); // Output: "comments" or "custom_comments" depending on how the model was defined
// This allows you to programmatically access the name of the collection associated with a particular Mongoose model.