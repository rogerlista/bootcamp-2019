const express = require('express')

const server = express()

let numeroDeRequisicoes = 0
const projects = []

server.use(express.json())

server.use((req, res, next) => {
  console.log(`Número de requisições: ${++numeroDeRequisicoes}`)

  return next()
})

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
  const project = { id, title, tasks: [] }

  projects.push(project)

  return res.json(project)
})

server.put('/projects/:id', checaProjetoExiste, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(project => project.id == id)

  project.title = title

  return res.json(projects)
})

server.delete('/projects/:id', checaProjetoExiste, (req, res) => {
  const { id } = req.params
  const projectIndex = projects.findIndex(project => project.id == 1)

  projects.splice(projectIndex, 1)

  return res.send()
})

server.post('/projects/:id/tasks', checaProjetoExiste, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(project => project.id == id)

  project.tasks.push(title)

  return res.json(project)
})

server.listen(3000)
