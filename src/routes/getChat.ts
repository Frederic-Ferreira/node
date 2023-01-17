import path from "path";
import { Application } from "express-ws";
import { findUserByid } from "../repositories/userRepository";

export function getChat(app: Application) {
  app.get("/chat", async (req, res) => {
    const user = await findUserByid(req.signedCookies.ssid);
    if (!user) {
      res.clearCookie("ssid");
      res.redirect("/login");
      return;
    }

    res.sendFile(path.join(process.cwd(), "public/chat/index.html"));
  });
}
