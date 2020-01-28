const express = require('express')

const server = express()

// query params -> localhost:3000/users?nome=Juca
// route params -> localhost:3000/users/34

server.get('/users', (req, res) => {
  const { nome } = req.query

  return res.json({ message: `Hello ${nome}` })
})

server.get('/users/:id', (req, res) => {
  const { id } = req.params

  return res.json({ message: `Usuário com id ${id}` })
})

server.listen('3000')
