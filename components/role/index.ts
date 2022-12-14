import { Request, Response } from 'express';
import { Role, RoleInput } from '../../models/role';
import ErrorHandler from '../../utils/handlers';

const createRole = async (req: Request, res: Response) => {
    try {
        const { description, name } = req.body;

        if (!name || !description) return res.serverError(422, 'The fields name and description are required');

        const role: RoleInput = {
            name,
            description,
        };

        const roleCreated = await Role.create(role);
        return res.success({ data: roleCreated });
    } catch (e) {
        res.serverError(500, ErrorHandler(e));
    }
};

const getRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = await Role.findOne({ _id: id });

    if (!role) {
        return res.serverError(404, `Role with id "${id}" not found.`);
    }

    return res.success({ data: role });
};

const getAllRoles = async (req: Request, res: Response) => {
    const roles = await Role.find().sort('-createdAt').exec();
    return res.success({ data: roles });
};

const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Partial any one value should be present
    const body: Partial<RoleInput> = req.body;

    const role = await Role.findOne({ _id: id });

    if (!role) {
        return res.status(404).json({ message: `Role with id "${id}" not found.` });
    }

    if (Object.keys(body).length === 0) {
        return res.status(422).json({ message: 'The fields name or description required' });
    }

    await Role.updateOne({ _id: id }, body);

    const roleUpdated = await Role.findById(id, body);

    return res.status(200).json({ data: roleUpdated });
};

const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Role.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Role deleted successfully.' });
};

export { createRole, getRole, getAllRoles, updateRole, deleteRole };
