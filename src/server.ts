import express, { Request, Response } from "express";
import expressWs, { Application } from "express-ws";
import cookieParser from "cookie-parser";
import path from "path";
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { getWsPosts } from "./routes/getWsPosts";
import { postLogin } from "./routes/postLogin";
import { authentificationMiddleware } from "./middlewares/authentificationMiddleware";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";
import { getProfile } from "./routes/getProfile";
import { updateProfile } from "./routes/updateProfile";
import { deleteProfile } from "./routes/deleteProfile";
import { getLogout } from "./routes/getLogout";

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  const SECRET_KEY = "harrible1234567";

  // pour pouvoir accéder au body de la requete
  app.use(express.urlencoded());

  // utiliser les cookies avec express (necessary to pass key to encrypt / decrypt)
  app.use(cookieParser(SECRET_KEY));

  // Set the template engine of the application to pug
  app.set("view engine", "pug");

  getLogin(app);
  postLogin(app);
  getRegister(app);
  postRegister(app);

  // Rather than check on each route, the middleware check authentification for all routes after it
  app.use(authentificationMiddleware);

  getLogout(app);
  getProfile(app);
  updateProfile(app);
  deleteProfile(app);
  getRoot(app);
  getWs(app, sockets);
  getWsPosts(app, sockets);

  // rend accessible le dossier public et son contenu depuis une url
  app.use(express.static(path.join(process.cwd(), "public")));

  app.use((err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).send("Internal error");
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
}

main();
