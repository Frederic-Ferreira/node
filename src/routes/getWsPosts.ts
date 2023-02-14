import { Application } from "express-ws";
import { WebSocket } from "ws";
import { createPost, createPostImage } from "../repositories/postRepository";
import { findUserByid } from "../repositories/userRepository";
import fs from "fs";
import path from "path";

export function getWsPosts(app: Application, sockets: Map<string, WebSocket>) {
  app.ws("/ws-posts", async (ws, req) => {
    const user = await findUserByid(req.signedCookies.ssid);
    if (!user) {
      ws.close();
      return;
    }

    sockets.set(user.id, ws);
    ws.on("message", async (msg: any) => {
      if (msg.includes("base64")) {
        const name = Date.now().toString() + ".png";

        const buffer = Buffer.from(msg.split(",")[1], "base64");

        const pathFile = path.join(__dirname, `../../public/images/${name}`);

        const writeStream = fs.createWriteStream(pathFile);

        writeStream.write(buffer);

        await createPostImage(name, user.id);

        sockets.forEach((socket) => {
          if (socket !== ws)
            socket.send(JSON.stringify({ type: "image", data: { msg, user } }));
        });
      } else {
        await createPost(msg, user.id);
        sockets.forEach((socket) => {
          if (socket !== ws)
            socket.send(JSON.stringify({ type: "post", data: { msg, user } }));
        });
      }
    });

    ws.on("close", () => {
      sockets.delete(user.id);
    });
  });
}
