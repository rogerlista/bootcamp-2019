import { Router } from 'express'

import userController from './app/controllers/user-controller'
import sessionController from './app/controllers/session-controller'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/users', userController.store)
routes.post('/sessions', sessionController.store)

export default routes
