import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../utils/error";
import { AdminLoginReq } from "../types/requests/admin.request";

const conf = process.env;

export const tokenVerify = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: any = req.header("token");

  if (!token) {
    let err = new CustomError(403, "Admin token is required/Login");
    next(err);
  } else {
    try {
      // Verifies token with secret in .env
      const decoded = jwt.verify(token, <jwt.Secret>conf.SECRET);
      res.locals.body = <AdminLoginReq>decoded;
      next();
    } catch (error) {
      next(error);
    }
  }
};
