import { Request, Response } from 'express';

const users = [{ name: 'Gabriel', email: 'gabrielteixeiramesquita@gmail.com' }];

export default {
    async index(req: Request, res: Response) {
        return res.json(users);
    },
};
