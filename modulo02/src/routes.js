import { Router } from 'express'

import User from './app/models/user'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.get('/users', async (req, res) => {
  const user = await User.create({
    name: 'Juca Bala',
    email: 'juca@email.com',
    password_hash: '12345678',
  })

  return res.json(user)
})

export default routes
