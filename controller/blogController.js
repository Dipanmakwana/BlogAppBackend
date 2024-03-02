const blogModel = require("../models/blogModel.js");
const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");

// Fetching all the blogs
exports.getAllBlogsController = async( req, res) =>{
    try {
        const allBlogs = await blogModel.find({}).populate("user");

        if(!allBlogs)
            return res.status(400).send({
                message : "Error while fetching Blogs."
            })

        return res.status(200).send({
            message : "Blogs Fetched successfully.",
            blogCount : allBlogs.length,
            allBlogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error From get all blogs.",
            error
        })
    }
};


// Fetching blog by id.
exports.getBlogbyId = async (req, res) =>{
    try {
        const {id} = req.params;
        const blog = await blogModel.find({_id : id}).populate('user');

        if(!blog)
            return res.status(400).send({
                message : "Error Blog not found!!!"
            })

        return res.status(200).send({
            message : "Blog fetched successfully.",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error while getting the blog."
        })
    }
};


// Creating the Blog
exports.createBlogController = async (req, res) =>{
    try {
        const {title, description, image, user} = req.body;

        if(!title || !description || !image || !user)
            return res.status(400).send({
                message : "All fields are require."
            })

        const existingUser = await userModel.findById(user);

        if(!existingUser)
            return res.status(400).send({
                message : "Unable to find user."
            })

        const newBlog = new blogModel({title, description, image, user});

        const session = await mongoose.startSession();
        session.startTransaction();

        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);

        await existingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();

        return res.status(200).send({
            message : "Blog Created Successfully",
            newBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error while creating Blog",
            error
        })
    }
};


// Updating the blog 
exports.updateBlogController = async (req, res) =>{
    try {
        const {id} = req.params;       

        const blog = await blogModel.findByIdAndUpdate(id, {...req.body}, {new : true});

        return res.status(200).send({
            message : "Blog updated successfully.",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error while updating the blog",
            error
        })
    }
};


// Deleting the blog
exports.deleteBlogController = async ( req, res) =>{
    try {
        const {id} = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            message : "Blog deleted successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'Error While deleting the blog.'})
    }
};

exports.userBlogController = async (req, res) =>{
    try {
        const {id} = req.params;
        const userBlog = await userModel.findById(id).populate("blogs");

        if(!userBlog)
            return res.status(400).send({
                message : "No blog found !!!"
            })

        return res.status(200).send({
            message : "Blog fetched from user.",
            userBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error while getting user blog.",
            error
        })
    }
}