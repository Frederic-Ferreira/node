import path from "path";
import { Application } from "express-ws";
import { connectedUserMiddleware } from "../middlewares/connectedUserMiddleware";

export function getRegister(app: Application) {
  app.get("/register", connectedUserMiddleware, (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/register/index.html"));
  });
}
