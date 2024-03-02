const express = require("express");
const {
    getAllBlogsController, 
    getBlogbyId, 
    createBlogController, 
    updateBlogController, 
    deleteBlogController,
    userBlogController 
} = require("../controller/blogController.js");

const router = express.Router();

// get all blogs
router.get("/all-blogs", getAllBlogsController);

// get particuler blog
router.get("/get-blog/:id", getBlogbyId);

// creating the blog
router.post("/create-blog", createBlogController);

// update a particular blog
router.put("/update-blog/:id", updateBlogController);

// deleting the blog 
router.delete("/delete-blog/:id", deleteBlogController);

// get user blogs
router.get("/user-blog/:id", userBlogController);

module.exports = router;