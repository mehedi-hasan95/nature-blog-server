const mongoose = require("mongoose");

const userCategory = new mongoose.Schema(
    {
        name: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", userCategory);
