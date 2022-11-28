import { Request, Response } from 'express';

const users = [{ name: 'Gabriel', email: 'gabrielteixeiramesquita@gmail.com' }];

export default {
     index(req: Request, res: Response) {
        return res.json(users);
    },
};
