const jwt = require("jsonwebtoken");

const authMiddleware = ( req, res, next ) =>
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
        req.user = decoded;

        next();
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