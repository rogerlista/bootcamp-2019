const express = require('express')

const server = express()

// query params -> localhost:3000/users?nome=Juca
// route params -> localhost:3000/users/34
// request body -> localhost:3000/users { "name": "Juca", "email", "juca@email.com" }

const users = ['Juca', 'Teobaldo', 'Tabajara'] // repositório

// CRUD - Create, Read, Update, Delete

server.use(express.json())

// Middleware global

server.use((req, res, next) => {
  console.time('Request')

  console.log(`Método ${req.method} - URL ${req.url}`)
  next()

  console.timeEnd('Request')
})

// Middleware local

function checkUserExists(req, res, next) {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'User name is required' })
  }

  return next()
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index]

  if (!user) {
    return res.status(400).json({ error: 'User does not exists' })
  }

  req.user = user

  return next()
}

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  // const { index } = req.params
  // return res.json(users[index])
  return res.json(req.user)
})

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body
  users.push(name)
  return res.json(users)
})

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params
  const { name } = req.body
  users[index] = name
  return res.json(users)
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const index = req.params
  users.splice(index, 1)
  return res.send()
})

server.listen('3000')
