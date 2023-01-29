import fileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { Application } from "express-ws";
import { findUserByid, addUserPicture } from "../repositories/userRepository";

export function postAvatar(app: Application) {
  app.post("/avatar", fileUpload(), async (req, res) => {
    const id = req.signedCookies.ssid;
    const user = await findUserByid(id);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    console.log(req.files);

    const files = req.files;
    const image = files?.image as UploadedFile;
    if (!image) {
      res.status(404).send("Image not good");
      return;
    }

    const pathFile = path.join(__dirname, `../../public/images/${image.name}`);

    await addUserPicture(id, image.name);

    const writeStream = fs.createWriteStream(pathFile);

    writeStream.write(image.data);

    res.redirect("/");
  });
}
