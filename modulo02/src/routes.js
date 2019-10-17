import { Router } from 'express'

import userController from './app/controllers/user-controller'
import sessionController from './app/controllers/session-controller'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/users', userController.store)
routes.post('/sessions', sessionController.store)

routes.use(authMiddleware)

routes.put('/users', userController.update)

export default routes
