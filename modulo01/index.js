const express = require('express')

const server = express()

// query params = /users?nome=Juca
// route params = /users/42
// body params = { nome='Juca', email='juca@email.com' }

const users = ['Juca', 'Teobaldo', 'Tabajara']

server.get('/users', (req, res) => {
  // const nome = req.query.nome
  const { nome } = req.query // utilizando desestruturação

  res.json({ message: `Hello World ${nome}` })
})

server.get('/users/:index', (req, res) => {
  // const id = req.params.id
  const { index } = req.params // utilizando desestruturação

  res.json(users[index])
})

server.listen(3000)
