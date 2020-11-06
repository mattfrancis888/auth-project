import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500);
    res.render("error", { error: err });
};
