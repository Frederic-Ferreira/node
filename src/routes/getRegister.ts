import path from "path";
import { Application } from "express-ws";

export function getRegister(app: Application) {
  app.get("/register", (req, res) => {
    if (req.signedCookies.ssid) {
      res.redirect("/");
      return;
    }

    res.sendFile(path.join(process.cwd(), "public/register/index.html"));
  });
}
