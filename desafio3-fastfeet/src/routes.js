import { Router } from 'express'
import multer from 'multer'

import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import DeliverymanController from './app/controllers/DeliverymanController'
import OrderController from './app/controllers/OrderController'
import DeliveryController from './app/controllers/DeliveryController'
import HandedOutController from './app/controllers/HandedOutController'
import FileController from './app/controllers/FileController'

import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to FastFeet' })
})

routes.post('/sessions', SessionController.store)

routes.get('/deliverymen/:deliveryman_id/deliveries', DeliveryController.index)
routes.get('/deliverymen/:deliveryman_id/handedout', HandedOutController.index)

routes.use(authMiddleware)

routes.get('/recipients', RecipientController.index)
routes.get('/recipients/:id', RecipientController.show)
routes.post('/recipients', RecipientController.store)
routes.put('/recipients/:id', RecipientController.update)
routes.delete('/recipients/:id', RecipientController.delete)

routes.get('/deliverymen', DeliverymanController.index)
routes.get('/deliverymen/:id', DeliverymanController.show)
routes.post('/deliverymen', DeliverymanController.store)
routes.put('/deliverymen/:id', DeliverymanController.update)
routes.delete('/deliverymen/:id', DeliverymanController.delete)

routes.get('/orders', OrderController.index)
routes.get('/orders/:id', OrderController.show)
routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.delete('/orders/:id', OrderController.delete)

routes.post('/files', upload.single('file'), FileController.store)

export default routes
