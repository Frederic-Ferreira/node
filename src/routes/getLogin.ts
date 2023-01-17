import path from "path";
import { Application } from "express-ws";

export function getLogin(app: Application) {
  app.get("/login", (req, res) => {
    if (req.signedCookies.ssid) {
      res.redirect("/");
      return;
    }

    res.sendFile(path.join(process.cwd(), "public/login/index.html"));
  });
}
