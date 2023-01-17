import { Application } from "express-ws";
import { findPosts, findUserByid } from "../repositories/userRepository";

export function getRoot(app: Application) {
  app.get("/", async (req, res) => {
    const id = req.signedCookies.ssid;

    const user = await findUserByid(id);
    if (!user) {
      res.clearCookie("ssid");
      res.redirect("/login");
      return;
    }

    const data = await findPosts();
    const posts = data.map((post) => post.content);

    res.render("root", { posts });
  });
}
