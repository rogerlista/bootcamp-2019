import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import sessionController from './app/controllers/session-controller'
import studentController from './app/controllers/student-controller'
import planController from './app/controllers/plan-controller'
import matriculationController from './app/controllers/matriculation-controller'
import checkinController from './app/controllers/checkin-controller'
import helpOrderController from './app/controllers/help-order-controller'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/sessions', sessionController.store)

routes.get('/students/:id/checkins', checkinController.index)
routes.post('/students/:id/checkins', checkinController.store)

routes.get('/students/:id/help-orders', helpOrderController.show)
routes.post('/students/:id/help-orders', helpOrderController.store)

routes.use(authMiddleware)

routes.post('/students', studentController.store)
routes.put('/students/:id', studentController.update)

routes.get('/plans', planController.index)
routes.get('/plans/:id', planController.show)
routes.post('/plans', planController.store)
routes.put('/plans/:id', planController.update)
routes.delete('/plans/:id', planController.delete)

routes.get('/matriculations', matriculationController.index)
routes.get('/matriculations/:id', matriculationController.show)
routes.post('/matriculations', matriculationController.store)
routes.put('/matriculations/:id', matriculationController.update)
routes.delete('/matriculations/:id', matriculationController.delete)

routes.get('/help-orders', helpOrderController.index)
routes.put('/help-orders/:id/answer', helpOrderController.update)

export default routes
