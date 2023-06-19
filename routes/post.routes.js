const express = require("express");
const {
  fetchAllPost,
  addPosts,
  editPost,
  fetchOnePost,
  deleteOnePost,
} = require("../controllers/post.controller");
const { verifyToken } = require("../middleware/verifyToken");
const multer = require("multer");
const isAdmin = require("../middleware/isAdmin");
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

// take author from the req user
const router = express.Router();

// get all post
router.get("/posts", fetchAllPost);

// get one post
router.get("/posts/:id", fetchOnePost);

// add post
router.post(
  "/posts",
  verifyToken,
  // isAdmin,
  upload.single("image"),
  addPosts
);

// edit post
router.patch(
  "/posts/:id",
  verifyToken,
  // isAdmin,
  upload.single("image"),
  editPost
);

// delete post
router.delete("/admin/posts/:id", verifyToken, isAdmin, deleteOnePost);

module.exports = { postRoutes: router };
