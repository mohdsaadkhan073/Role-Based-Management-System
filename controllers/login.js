const User = require("../models/user");

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

        if(password === existingUser["password"])
        {
            const generateToken = require("../utils/generateToken");
            const token = generateToken(existingUser.id);   
            console.log("Login user reached");
            console.log(token);
            console.log("Login user reached2");
            res.status(200).json({
                success: true,
                message: "Logged in successfully",
                existingUser,
                token
            });
        }
        else
        {
            res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
    }
    catch(error)
    {
        console.log(`Error: ${error}`)
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

        res.status(200).json({user});
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

module.exports = { 
    loginUser,
    getProfile
 };