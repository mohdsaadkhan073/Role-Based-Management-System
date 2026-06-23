const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            version: user.tokenVersion,
            role: user.role.name,
            permissions: user.role.permissions
        },
        process.env.jwt_secret,
        { expiresIn: "7d" },
    );
};

module.exports = generateToken;