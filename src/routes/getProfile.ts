import { Application } from "express-ws";
import { findUserByid } from "../repositories/userRepository";

export function getProfile(app: Application) {
  app.get("/profile", async (req, res) => {
    const id = req.signedCookies.ssid;
    const user = await findUserByid(id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const { email, name } = user;
    let path = user.avatar ? user.avatar : "";

    // pass email and name to the pug template user
    res.render("user", { email, name, path });
  });
}
