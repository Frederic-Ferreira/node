import { Application } from "express-ws";
import { findPosts } from "../repositories/postRepository";

export function getRoot(app: Application) {
  app.get("/", async (req, res) => {
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
