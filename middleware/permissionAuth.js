const permissionAuth = (requiredPermission) => {
    return (req, res, next) => {
        try
        {
            // const user = req.body;
            // if(!user)
            // {
            //     return res.status(404).json({
            //         success: false,
            //         message: "User not found in permissionAuth"
            //     });
            // }
            const permission = req.user.role.permissions || [];
            if(!permission)
            {
                return res.status(404).json({
                    success: false,
                    message: "No permissions found"
                });
            }

            if(!(permission.includes(requiredPermission)))
            {
                return res.status(401).json({
                    success: false,
                    message: "Access Denied, you dont have permission to this api"
                });
            }

            next();

        }
        catch(error)
        {
            console.log(`Error in permissionAuth: ${error}`);
            res.status(500).json({
                success: false,
                message: "Internal Server Error while permission validation"
            });
        }
    }
}

module.exports = permissionAuth;