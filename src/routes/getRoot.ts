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
    const posts = data.map((post) => {
      if (post.content) {
        return {
          content: post.content,
        };
      } else if (post.image) {
        return {
          image: post.image,
        };
      }
    });

    res.render("root", { posts });
  });
}
