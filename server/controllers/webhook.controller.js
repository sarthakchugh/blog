const { Webhook } = require('svix');
const User = require('../models/user.model');

const clerkWebhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error('Missing Webhook Secret');
    }

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({ message: 'Webhook verification failed!' });
    }

    if (evt.type === 'user.created') {
        const newUser = new User({
            clerkId: evt.data.id,
            username: evt.data.username,
            email: evt.data.email_addresses[0].email_address,
            image: evt.data.profile_image_url,
        });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    }
};

module.exports = {
    clerkWebhook,
};
