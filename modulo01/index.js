const express = require('express')

const server = express()

server.use(express.json())

// query params = /users?nome=Juca
// route params = /users/42
// body params = { nome='Juca', email='juca@email.com' }

// CRUD - Create, Read, Update, Delete

const users = ['Juca', 'Teobaldo', 'Tabajara']

// middleware global
server.use((req, res, next) => {
  console.time('Tempo da requisição')
  console.log(`Método: ${req.method} | URL: ${req.url}`)
  next()
  console.timeEnd('Tempo da requisição')
})

// middleware local
function checaUsuarioExiste(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'Nome do usuário é obrigatório.' })
  }

  return next()
}

function checaUsuarioNoArray(req, res, next) {
  const user = users[req.params.index]

  if (!user) {
    return res.status(400).json({ error: 'Usuário não existe.' })
  }

  req.user = user

  return next()
}

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checaUsuarioNoArray, (req, res) => {
  return res.json(req.user)
})

server.post('/users', checaUsuarioExiste, (req, res) => {
  const { nome } = req.body

  users.push(nome)

  return res.json(users)
})

server.put(
  '/users/:index',
  checaUsuarioNoArray,
  checaUsuarioExiste,
  (req, res) => {
    const { index } = req.params
    const { nome } = req.body

    users[index] = nome

    return res.json(users)
  }
)

server.delete('/users/:index', checaUsuarioNoArray, (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.send()
})

server.listen(3000)
