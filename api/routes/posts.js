const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const upload = require('../middleware/upload');


router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getPostByID);
router.post("/", upload.single('image'), PostsController.createPost);




module.exports = router;
