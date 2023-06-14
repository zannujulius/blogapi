const Post = require("../models/post.model");

// get the postss
const fetchAllPost = async (req, res, next) => {
  const allPost = await Post.find();
  // remember to paginate this guy
  return res.status(200).json({
    message: "success",
    data: allPost,
  });
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
