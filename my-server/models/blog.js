const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Blog = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: String },
    content: { type: String, required: true },
    subcontent: {
        type: String,
    },
    thumbnail: { type: [String] },
});

module.exports = mongoose.model("Blog", Blog);