const jwt = require("jsonwebtoken");

const generateToken = (id, tokenVersion) => {
    return jwt.sign(
        { 
            id,
            version: tokenVersion
        },
        process.env.jwt_secret,
        { expiresIn: "7d" },
    );
};

module.exports = generateToken;