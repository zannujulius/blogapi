const Post = require("../models/post.model");
const User = require("../models/user.model");

// get the postss
const fetchAllPost = async (req, res, next) => {
  try {
    const allPost = await Post.find();
    const allUsers = await User.find();
    console.log(allUsers, "//all users");
    console.log(allPost, "all Post");
    // remember to paginate this guy
    return res.status(200).json({
      message: "success",
      data: allPost,
    });
  } catch (err) {
    console.log(err);
  }
};

// add a post
const addPosts = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({
        status: 400,
        message: "Please provide your first name.",
      });
      return;
    }
    const { firstName, lastName } = req.user;
    const newPost = new Post({
      content,
      imageUrl: req.file.path,
      author: `${firstName} ${lastName}`,
    });

    newPost
      .save()
      .then((response) => {
        res.status(201).json({
          message: "Post created successfully",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  fetchAllPost,
  addPosts,
};
