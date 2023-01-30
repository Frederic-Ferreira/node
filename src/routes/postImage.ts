import fileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { Application } from "express-ws";
import { findUserByid } from "../repositories/userRepository";

export function postImage(app: Application) {
  app.post("/image", fileUpload(), async (req, res) => {
    const id = req.signedCookies.ssid;
    const user = await findUserByid(id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const files = req.files;

    let name, data;
    for (let key in files) {
      name = key;
      const image = files[key] as UploadedFile;
      data = image.data;
    }

    if (name && data) {
      const pathFile = path.join(__dirname, `../../public/images/${name}`);

      const writeStream = fs.createWriteStream(pathFile);

      writeStream.write(data);
    }

    // res.redirect("/");
  });
}
