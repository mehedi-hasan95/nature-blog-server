const mongoose = require("mongoose");

const userPost = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        headding: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        categories: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", userPost);
