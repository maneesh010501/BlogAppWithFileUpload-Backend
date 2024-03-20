const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const dbConnect = require('./config/database');
dbConnect();

const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect();

const blog = require('./routes/blog');
app.use('/api/v1/', blog);

app.listen(PORT, () => {
    console.log(`app started at port ${PORT}`);
})