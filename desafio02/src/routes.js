import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/session-controller'
import studentController from './app/controllers/student-controller'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/sessions', sessionController.store)

routes.use(authMiddleware)

routes.post('/students', studentController.store)
routes.put('/students/:id', studentController.update)

export default routes
