const User = require("../models/user");

const registerUser = async (req, res) => {
    try
    {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser)
        {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    registerUser
}