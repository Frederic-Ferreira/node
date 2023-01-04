import path from 'path'
import { Application } from 'express-ws'
import { findUserByid } from '../repositories/userRepository'

export function getRoot(app: Application) {
  app.get('/', async (req, res) => {
    if (!req.signedCookies.ssid) {
      res.redirect('/login')
      return
    }

    const user = await findUserByid(req.signedCookies.ssid)
    if (!user) {
      res.clearCookie('ssid')
      res.redirect('/login')
      return
    }

    res.sendFile(path.join(process.cwd(), 'public/index.html'))
  })
}
