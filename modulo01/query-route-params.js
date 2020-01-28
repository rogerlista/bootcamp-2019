const express = require('express')

const server = express()

// query params -> localhost:3000/users?nome=Juca
// route params -> localhost:3000/users/34
// request body -> localhost:3000/users { "name": "Juca", "email", "juca@email.com" }

const users = ['Juca', 'Teobaldo', 'Tabajara'] // repositório

// CRUD - Create, Read, Update, Delete

server.use(express.json())

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', (req, res) => {
  const { index } = req.params
  return res.json(users[index])
})

server.post('/users', (req, res) => {
  const { name } = req.body
  users.push(name)
  return res.json(users)
})

server.put('/users/:index', (req, res) => {
  const { index } = req.params
  const { name } = req.body
  users[index] = name
  return res.json(users)
})

server.delete('/users/:index', (req, res) => {
  const index = req.params
  users.splice(index, 1)
  return res.send()
})

server.listen('3000')
