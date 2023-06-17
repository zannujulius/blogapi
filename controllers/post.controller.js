const Post = require("../models/post.model");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extensionType = file.mimetype.split("/")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extensionType;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    // fileSize: 10_000, // 10MB;
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

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

// get a particular post
const fetchOnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "Not found",
        message: "A post id is required",
      });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        status: "Invalid Id",
        message: "You have passed an invalid post id",
      });
      return;
    }

    const foundPost = await Post.findOne({ _id: id });

    if (!foundPost) {
      res.status(404).json({
        status: "Not found",
        message: "Post not found",
      });
      return;
    }
    res.status(200).json({
      data: foundPost,
      message: "successful",
    });
  } catch (err) {
    console.log(err.message, "//error message");
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

// edit post
const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: "Missing parameter",
        message: "post ID is missing",
      });
      return;
    }

    const foundPost = await Post.findById(id);

    if (!foundPost) {
      res.status(400).json({
        status: "Not found",
        message: `Post with ID-${id} was not found.`,
      });
      return;
    }
    const { firstName, lastName } = req.user;

    // check if it a different image upload
    if (req.file.path !== foundPost?.imageUrl) {
      const pathToFile = path.resolve(foundPost?.imageUrl);
      const imgExist = fs.existsSync(pathToFile);
      if (imgExist) {
        fs.unlink(pathToFile, (err) => {
          if (err) {
            res.status(500).send({
              message: "Could not delete the file. " + err,
            });
          }
          console.log("File deleted");
        });
      }
      console.log(imgExist, "image exist");
    }

    const newUpdate = {
      content: req.body?.content,
      imageUrl: req.file.path,
      author: `${firstName} ${lastName}`,
    };

    // const updatedPost = await Post.findOneAndUpdate({ _id: id }, newUpdate, {
    //   new: true,
    // });
    res.status(200).json({
      data: [],
      message: "Updated document",
    });
  } catch (err) {
    console.log(err);
  }
};

//delete post
const deleteOnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "Not found",
        message: "A post id is required",
      });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        status: "Invalid Id",
        message: "Unable to fetch post",
      });
      return;
    }

    const foundPost = await Post.findByIdAndDelete(id);

    if (!foundPost) {
      res.status(404).json({
        status: "Not found",
        message: "Post not found",
      });
      return;
    }
    res.status(200).json({
      status: "Deleted",
      message: "Post deleted successful",
    });
  } catch (err) {
    console.log(err.message, "//error message");
  }
};

module.exports = {
  fetchAllPost,
  addPosts,
  editPost,
  fetchOnePost,
  deleteOnePost,
};
