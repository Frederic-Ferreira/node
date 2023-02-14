import { updateUser } from "../repositories/userRepository";
import { Application } from "express-ws";

export function updateProfile(app: Application) {
  app.post("/profile", async (req, res) => {
    const id = req.signedCookies.ssid;
    const { email, name } = req.body;

    if (!email || !name) {
      res.status(500).send("Email or name not good.");
      return;
    }

    const user = await updateUser(id, email, name);
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    res.redirect("/");
  });
}
