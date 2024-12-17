const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { clerkMiddleware } = require('@clerk/express');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

// Using webhooks
app.use(clerkMiddleware());
const webhookRoutes = require('./routes/webhook.route');
app.use('/api/webhooks', webhookRoutes);

// Using ImageKit
// allow cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//Import the routes
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');

// Parsing the body
app.use(express.json());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

//Connect to the database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
