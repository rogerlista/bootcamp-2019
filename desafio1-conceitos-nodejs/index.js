const express = require('express')

const server = express()

const projects = []
let contadorRequisicoes = 0

server.use(express.json())

server.use((req, res, next) => {
  console.log('Número de requisições', ++contadorRequisicoes)
  return next()
})

function checkProjectExists(req, res, next) {
  const { id } = req.params
  const index = projects.findIndex(project => project.id === id)

  if (index < 0) {
    return res.json({ error: 'Project not found.' })
  }

  req.projectIndex = index
  req.project = projects[index]

  return next()
}

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.get('/projects/:id', checkProjectExists, (req, res) => {
  return res.json(req.project)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body
  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(project)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { title } = req.body

  projects[req.projectIndex].title = title

  return res.json(projects[req.projectIndex])
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1)
  return res.send()
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body

  projects[req.projectIndex].tasks.push(title)

  return res.json(projects[req.projectIndex])
})

server.listen('3000')
