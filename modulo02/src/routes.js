import { Router } from 'express'

const routes = new Router()

import User from './app/models/User'

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Teste teste',
    email: 'teste@teste.com',
    password_hash: '3435434345',
  })

  return res.json(user)
})

export default routes
