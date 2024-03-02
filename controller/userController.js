const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

// register user
exports.registerController = async(req, res) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password)
            return res.status(400).send({
                message : "Please fill all fields"
            })

        const exist = await userModel.findOne({email});

        if(exist) 
            return res.status(400).send({
                message : "Email already Exist !!!"
            })

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = new userModel({username, email, password : hashedPassword});
        await data.save();

        return res.status(200).send({
            message : "User saved successfully.",
            data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({message : "Error in register callback", error})
    }
};

// get all the users
exports.getAllUsers = async (req, res) =>{
    try {
        const users = await userModel.find({});
        
        return res.status(200).send({
            userCount : users.length,
            message : "All Users Data",
            users
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error in get all users",
            error
        })
    }
};

// login
exports.loginController = async (req, res) =>{
    try {
        const {email, password} = req.body;

        // checking is all the fields are field or not.
        if(!email || !password)
            return res.status(400).send({
                message : "Please fill all the Fields"
            })

        // finding the user
        const findUser = await userModel.findOne({email});

        // checking that the user is existing or not
        if(!findUser)
            return res.status(400).send({
                message : "User not Exist."
            })

        // checkinf the enterd and db password
        const isTrue = await bcrypt.compare(password, findUser.password);

        if(isTrue == false)
            return res.status(400).send({
                message : "Password is wrong."
            })

        // if all the fields are valid than user gets loggin.
        return res.status(200).send({
            message : "User logged in successfully.",
            findUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Error in login callback",
            error
        })
    }
};

exports.getOneUser = async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await userModel.find({_id:id}).populate("blogs");

        if(!user)
            return res.status(400).send({
                message : "Error While Fetching User."
            })

        return res.status(200).send({
            message : "User fetched successfully.",
            user
        })
    } catch (error) {
        console.log("Error while fetching one User : ",error);
        return res.status(500).send({
            message : "Error while fetching user",
            error
        })
    }
}