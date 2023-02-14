import { Request, Response, NextFunction } from "express";
import { findUserByid } from "../repositories/userRepository";

export async function connectedUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.signedCookies.ssid && (await findUserByid(req.signedCookies.ssid))) {
    res.redirect("/");
    return;
  }
  next();
}
