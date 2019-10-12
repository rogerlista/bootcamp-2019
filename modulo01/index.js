const express = require('express')

const server = express()

// query params = /users?nome=Juca
// route params = /users/42
// body params = { nome='Juca', email='juca@email.com' }

server.get('/users', (req, res) => {
  // const nome = req.query.nome
  const { nome } = req.query // utilizando desestruturação

  res.json({ message: `Hello World ${nome}` })
})

server.get('/users/:id', (req, res) => {
  // const id = req.params.id
  const { id } = req.params // utilizando desestruturação

  res.json({ message: `Buscando o usuário ${id}` })
})

server.listen(3000)
