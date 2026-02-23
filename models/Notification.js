const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['new_post', 'updated_post', 'new_image', 'new_track', 'updated_track', 'custom'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    message: {
        type: String,
        default: '',
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800 // auto-delete after 7 days (in seconds)
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
