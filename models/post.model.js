const moment = require("moment");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: String,
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  author: String,
  imageUrl: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
// -> content (body)
// -> likes
// -> comments
// -> date
// -> author
// -> image url
