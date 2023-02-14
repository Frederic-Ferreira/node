import fileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import { Application } from "express-ws";
import { addUserPicture } from "../repositories/userRepository";

export function postAvatar(app: Application) {
  app.post("/avatar", fileUpload(), async (req, res) => {
    const id = req.signedCookies.ssid;

    const files = req.files;
    const image = files?.image as UploadedFile;

    if (!image) {
      res.status(404).send("Image not good");
      return;
    }

    const extensionName = path.extname(image.name);
    const authorizedExtensions = [".jpg", ".jpeg", ".png"];

    if (!authorizedExtensions.includes(extensionName)) {
      res.status(422).send("Image format not good");
    }

    const fileName = id + extensionName;

    const pathFile = path.join(__dirname, `../../public/images/${fileName}`);

    await addUserPicture(id, fileName);

    const writeStream = fs.createWriteStream(pathFile);

    writeStream.write(image.data);

    res.redirect("/");
  });
}
