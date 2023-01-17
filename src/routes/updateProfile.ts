import { updateUser } from "../repositories/userRepository";
import { Application } from "express-ws";

export function updateProfile(app: Application) {
  app.post("/profile", async (req, res) => {
    const id = req.signedCookies.ssid;
    const { email, name } = req.body;

    const user = await updateUser(id, name, email);
    if (!user) {
      res.status(401).send("User not found");
      return;
    }
    res.redirect("/");
  });
}
