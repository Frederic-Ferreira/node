import { findUserByEmail } from '../repositories/userRepository'
import { Application } from 'express-ws'

export function postLogin(app: Application) {
  app.post('/login', async (req, res) => {
    const email = req.body.email
    const user = await findUserByEmail(email)
    if (!user) {
      res.status(401).send('Invalid email')
      return
    }
    res.cookie('ssid', user.id, {
      signed: true,
      httpOnly: true,
      sameSite: true,
    })
    res.redirect('/')
  })
}
