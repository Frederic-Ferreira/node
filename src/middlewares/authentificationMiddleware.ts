import { Request, Response, NextFunction } from "express";

export function authentificationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.signedCookies.ssid) {
    res.redirect("/login");
    return;
  }
  next();
}
