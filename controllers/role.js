const Role = require("../models/roleSchema");

const createRole = async (req, res) => {
    try
    {
        const { name, permissions } = req.body;

        const existingRole = await Role.findOne({ name });
        if (existingRole)
        {
            return res.status(400).json({
                success: false,
                message: "Role already exists"
            });
        }

        const role = await Role.create({
            name,
            permissions
        });

        res.status(201).json({
            success: true,
            message: "Role Created Successfully"
        });
        console.log(`Role Created: ${name}`);
    }
    catch(error)
    {
        console.log(`Error in createRole: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = createRole;