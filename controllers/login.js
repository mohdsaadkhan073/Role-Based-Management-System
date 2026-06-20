const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(!existingUser)
        {
            console.log("LoginError: User does not Exist");
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if(!isMatch)
        {
            res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        else
        {
            const generateToken = require("../utils/generateToken");
            const token = generateToken(existingUser.id, existingUser.tokenVersion);   
            res.status(200).json({
                success: true,
                message: "Logged in successfully",
                existingUser,
                token
            });
            console.log("User just logged in");
        }
    }
    catch(error)
    {
        console.log(`Error in loginUser: ${error}`)
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
}

const getProfile = async (req, res) => {
    try
    {
        const user = await User.findById(req.user.id);

        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({user});
        console.log("profile request was made")
    }
    catch(error)
    {
        console.log(`Error in getProfile: ${error}`);
        res.status(500).json({
            succes: false,
            messasge: "Internal Server Error"
        });
    }
}

const updateProfile = async (req, res) => {
    try
    {
        const { name, password } = req.body;
        const user = await User.findById(req.user.id);

        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.name = name || user.name;
        const hashedPassword = await bcrypt.hash(password || user.password, 10);
        user.password = hashedPassword || user.password;

        await user.save();

        res.status(200).json({
            success: true,
            user
        });

        console.log(`User Updated`);
    }
    catch(error)
    {
        console.log(`Error in updateUser: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const deleteUser = async (req, res) => {
    try
    {
        const user = await User.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await user.deleteOne();
        
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            user
        });

        console.log(`User Deleted`);
    }
    catch(error)
    {
        console.log(`Error in deleteUser: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const logoutUser = async (req, res) => {
    try
    {
        const user = await User.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.tokenVersion++;
        user.save();
        res.status(200).json({
            success: true,
            message: "Logged out Successfully"
        });
        console.log("User Logged Out");
        console.log(`TokenVersion: ${user.tokenVersion}`);
    }
    catch(error)
    {
        console.log(`Error in logoutUser: ${error}`);
        res.status(500).jsoj({
            success: false,
            message: "Internal Server Error"
        });
    }
}
 
module.exports = { 
    loginUser,
    getProfile,
    updateProfile,
    deleteUser,
    logoutUser
};