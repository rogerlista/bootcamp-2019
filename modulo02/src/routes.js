import { Router } from 'express'
import multer from 'multer'

import userController from './app/controllers/user-controller'
import sessionController from './app/controllers/session-controller'
import providerController from './app/controllers/provider-controller'
import appointmentController from './app/controllers/appointment-controller'
import fileController from './app/controllers/file-controller'

import authMiddleware from './app/middlewares/auth'
import multerConfig from './config/multer'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => {
  return res.json({ message: 'Olá seja bem vindo!' })
})

routes.post('/users', userController.store)
routes.post('/sessions', sessionController.store)

routes.use(authMiddleware)

routes.put('/users', userController.update)

routes.get('/providers', providerController.index)

routes.get('/appointments', appointmentController.index)
routes.post('/appointments', appointmentController.store)

routes.post('/files', upload.single('file'), fileController.store)

export default routes
