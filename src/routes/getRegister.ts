import path from "path";
import { Application } from "express-ws";

export function getRegister(app: Application) {
  app.get("/register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/register/index.html"));
  });
}
