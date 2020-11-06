import { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
    res.send({ success: "true" });
};
