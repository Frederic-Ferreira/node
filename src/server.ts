import express, { Request, Response, NextFunction } from 'express'
import expressWs, { Application } from 'express-ws'
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from './routes/getLogin'
import { getRoot } from './routes/getRoot'
import { getWs } from './routes/getWs'
import { postLogin } from './routes/postLogin'
import { authentificationMiddleware } from './middlewares/authentificationMiddleware'
import { getRegister } from './routes/getRegister'
import { postRegister } from './routes/postRegister'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  const SECRET_KEY = 'harrible1234567'

  // pour pouvoir accéder au body de la requete
  app.use(express.urlencoded())

  // utiliser les cookies avec express (necessary to pass key to encrypt / decrypt)
  app.use(cookieParser(SECRET_KEY))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authentificationMiddleware)

  getRoot(app)
  getWs(app, sockets)

  // rend accessible le dossier public et son contenu depuis une url
  app.use(express.static(path.join(process.cwd(), 'public')))

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send('Internal error')
  })

  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })
}

main()
