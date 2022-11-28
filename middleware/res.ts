import { NextFunction, Request, Response } from 'express';

const response = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data) => res.status(200).json({ success: true, ...data });

    res.serverError = (code, data) => {
        if (code !== 402 && code !== 401 && code !== 500)
            return res.status(200).json({ success: false, message: data, code });
        else return res.status(code).json({ success: false, message: data });
    };
    res.displayError = (code, message) => res.status(200).json({ success: false, error: { code, message } });
    res.unauthorized = () =>
        res.status(200).json({
            success: false,
            message: 'un authorized',
            code: 400,
        });
    next();
};

export { response };
