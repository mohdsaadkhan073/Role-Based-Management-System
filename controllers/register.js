const User = require("../models/user");
const bcrypt = require("bcrypt");

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
        
        const hashedPassword = await bcrypt.hash(password, 10);

        let tokenVersion = 0;
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            tokenVersion
        });

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        });
        console.log("New user registered")
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