const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String },
  content: { type: String },
  subcontent: { type: String },
  thumbnail: { type: [String] }, // Đổi thành mảng
});

module.exports = mongoose.model("blog", Blog);
