import { Router } from 'express'

import SessionController from './app/controllers/SessionController'

const routes = new Router()

routes.get('/', (req, res) => {
  return res.json({ message: 'Welcome to FastFeet' })
})

routes.post('/sessions', SessionController.store)

export default routes
