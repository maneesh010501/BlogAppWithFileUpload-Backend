const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require('dotenv').config();

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    email: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

postSchema.post('save', async function (doc) {
    try {
        console.log("doc : ", doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let info = await transporter.sendMail({
            from: 'Maneesh',
            to: doc.email,
            subject: "New Post Uploaded",
            html: `<h2>Hello</h2> <p>Your new post is now uploaded</p> <p>View here : name : ${doc.name}, description : ${doc.description}, image : ${doc.imageUrl}</p>`
        })
    }
    catch (err) {
        console.error(err);
        console.log(err);
    }
})

module.exports = mongoose.model('Post', postSchema);