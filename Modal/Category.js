const mongoose = require("mongoose");

const userCategory = new mongoose.Schema(
    {
        categories: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", userCategory);
