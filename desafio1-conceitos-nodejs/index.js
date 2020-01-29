const express = require('express')

const server = express()

const projects = []

server.use(express.json())

server.use((req, res, next) => {
  console.count('Requisições')
  return next()
})

function checkProjectExists(req, res, next) {
  const { id } = req.params
  const project = projects.find(project => project.id === id)

  if (!project) {
    return res.status(400).json({ error: 'Project not found.' })
  }

  req.project = project

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

  req.project.title = title

  return res.json(req.project)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const index = projects.findIndex(project => project.id === id)

  projects.splice(index, 1)

  return res.send()
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body

  req.project.tasks.push(title)

  return res.json(req.project)
})

server.listen('3000')
