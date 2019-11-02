import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/session-controller'
import studentController from './app/controllers/student-controller'
import planController from './app/controllers/plan-controller'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/sessions', sessionController.store)

routes.use(authMiddleware)

routes.post('/students', studentController.store)
routes.put('/students/:id', studentController.update)

routes.get('/plans', planController.index)
routes.get('/plans/:id', planController.show)
routes.post('/plans', planController.store)
routes.put('/plans/:id', planController.update)
routes.delete('/plans/:id', planController.delete)

export default routes
