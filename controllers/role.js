const Role = require("../models/roleSchema");
const User = require("../models/user");

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
            message: "Role Created Successfully",
            role
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

const getAllRoles = async (req, res) => {
    try
    {
        const roles = await Role.find();
        if(!roles)
        {
            return res.status(404).json({
                success: true,
                message: "No Roles Exists"
            });
        }

        res.status(200).json({
            success: true,
            message: "Roles Fetched Successfully!",
            data: roles
        });
    }
    catch(error)
    {
        console.log(`Error in getAllRoles: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching roles"
        });
    }
}

const updateRole = async (req, res) => {
    try
    {
        const { name, permissions } = req.body;
        const id = req.params.id;
        const role = await Role.findById(id);
        if(!role)
        {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        role.name = name || role.name;
        role.permissions = permissions || role.permissions;
        updatedRole = await role.save();

        res.status(200).json({
            success: true,
            message: "Role Updated Successfully",
            updatedRole
        });
        console.log(`Role updated by ${role.name}`);
    }
    catch(error)
    {
        console.log(`Error while update Role: ${error}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error while updating Role"
        });

    }
}

const assignRole = async (req, res) => {
    try
    {
        const userId = req.params.id;
        const { roleId } = req.body;
        console.log(roleId);
        const user = await User.findById(userId);
        if(!user)
        {
            return res.status(404).json({
                success: false,
                messaeg: "user not found"
            });
        }
        const role = await Role.findById(roleId);
        if(!role)
        {
            return res.status(404).json({
                success: false, 
                message: "Role not found"
            });
        }

        user.role = role._id;
        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            message: "Role Assigned Successfully!",
            updatedUser
        })
    }
    catch(error)
    {
        console.log(`Error in assignRole: ${error}`);
        res.status(500).json({
            success: false, 
            message: "Internal Server Error while assigning the role"
        });
    }
}

module.exports = {
    createRole,
    getAllRoles,
    assignRole,
    updateRole
}