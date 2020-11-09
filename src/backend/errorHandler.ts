import { Request, Response, ErrorRequestHandler } from "express";
//https://stackoverflow.com/questions/47002688/rest-api-only-in-express-getting-error-no-default-engine-was-specified-and-no
export const errorHandler = (err: any, req: Request, res: Response) => {
    res.status(500);
    res.send({ error: err });
};
