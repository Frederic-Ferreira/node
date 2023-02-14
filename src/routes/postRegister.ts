import { createUser, findUserByEmail } from "../repositories/userRepository";
import { Application } from "express-ws";
import { connectedUserMiddleware } from "../middlewares/connectedUserMiddleware";

export function postRegister(app: Application) {
  app.post("/register", connectedUserMiddleware, async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
      res.status(400).send("Bad request");
      return;
    }
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).send("Email already used");
      return;
    }

    const user = await createUser(email, name);
    res.cookie("ssid", user.id, {
      signed: true,
      httpOnly: true,
      sameSite: true,
    });
    res.redirect("/");
  });
}
