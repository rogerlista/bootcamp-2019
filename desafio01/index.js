const express = require('express')

const server = express()

const projects = []

server.use(express.json())

function checaProjetoExiste(req, res, next) {
  const { id } = req.params

  const existe = projects.find(project => project.id == id)

  if (!existe) {
    return res.status(400).json({ error: 'Projeto não existe.' })
  }

  return next()
}

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({ id, title, tasks: [] })

  return res.json(projects)
})

server.put('/projects/:id', checaProjetoExiste, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[index(id)].title = title

  return res.json(projects)
})

server.delete('/projects/:id', checaProjetoExiste, (req, res) => {
  const { id } = req.params

  projects.splice(index(id), 1)

  return res.send()
})

server.post('/projects/:id/tasks', checaProjetoExiste, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  projects[index(id)].tasks.push(title)

  return res.json(projects)
})

function index(id) {
  return projects.findIndex(project => project.id == id)
}

server.listen(3000)
