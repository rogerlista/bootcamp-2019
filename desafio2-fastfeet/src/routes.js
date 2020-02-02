import { Router } from 'express'

import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to FastFeet' })
})

routes.post('/sessions', SessionController.store)

routes.get('/recipients', RecipientController.index)
routes.get('/recipients/:id', RecipientController.show)
routes.post('/recipients', RecipientController.store)
routes.put('/recipients/:id', RecipientController.update)
routes.delete('/recipients/:id', RecipientController.delete)

export default routes
