const jwt = require("jsonwebtoken");
const User = require("../models/user")

const authMiddleware = async ( req, res, next ) =>
{
    try
    {
        const authHeader = req.headers.authorization;
        if(!authHeader)
        {
            return res.status(401).json({
                success: false,
                message: "Missing Token"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify (
            token,
            process.env.jwt_secret
        );

        const user = await User.findById(decoded.id).populate("role");

        if(!user)
        {
            return res.status(401).json({
                success: false,
                messsage: "Incorrect Token"
            });
        }
        
        if(decoded.version === user.tokenVersion)
        {
            req.user = user;
            console.log("Token authorized...")
            next();
        }
        else
        {
            return res.status(401).json({
                success: false,
                message: "Token Expired"
            });
        }
    }
    catch(error)
    {
        console.log(`Error in authMiddleware: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = authMiddleware;