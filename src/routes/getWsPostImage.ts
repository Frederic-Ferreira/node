import { Application } from "express-ws";
import { WebSocket } from "ws";
import { findUserByid, createPostImage } from "../repositories/userRepository";
import fs from "fs";
import path from "path";

export function getWsPostImage(
  app: Application,
  sockets: Map<string, WebSocket>
) {
  app.ws("/ws-posts-image", async (ws, req) => {
    const user = await findUserByid(req.signedCookies.ssid);
    if (!user) {
      ws.close();
      return;
    }

    sockets.set(user.id, ws);

    ws.on("message", async (msg: any) => {
      const pathName = Date.now().toString() + ".png";

      const pathFile = path.join(__dirname, `../../public/images/${pathName}`);

      const writeStream = fs.createWriteStream(pathFile);

      writeStream.write(msg);

      await createPostImage(pathName, user.id);

      sockets.forEach((socket) => {
        if (socket !== ws)
          socket.send(
            JSON.stringify({ type: "reply", data: { pathName, user } })
          );
      });
    });

    ws.on("close", () => {
      sockets.delete(user.id);
    });
  });
}
