const express = require('express')

const server = express()

const users = ['Juca', 'Teobaldo', 'Tabajara']

// query params -> localhost:3000/users?nome=Juca
// route params -> localhost:3000/users/34

server.get('/users', (req, res) => {
  const { nome } = req.query

  return res.json({ message: `Hello ${nome}` })
})

server.get('/users/:index', (req, res) => {
  const { index } = req.params

  return res.json(users[index])
})

server.listen('3000')
