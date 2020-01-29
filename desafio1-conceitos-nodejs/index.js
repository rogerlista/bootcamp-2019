const express = require('express')

const server = express()

const projects = []

server.use(express.json())

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.get('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const project = projects.find(project => project.id === id)
  return res.json(project)
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

server.put('/projects/:id', (req, res) => {
  const { title } = req.body
  const index = getIndex(req.params.id)

  if (index >= 0) {
    projects[index].title = title
    return res.json(projects[index])
  }

  return res.send('Project not found')
})

server.delete('/projects/:id', (req, res) => {
  const index = getIndex(req.params.id)

  projects.splice(index, 1)

  return res.send()
})

server.post('/projects/:id/tasks', (req, res) => {
  const { title } = req.body
  const index = getIndex(req.params.id)

  if (index >= 0) {
    projects[index].tasks.push(title)
    return res.json(projects[index])
  }

  return res.send('Project not found')
})

function getIndex(idText) {
  const id = parseInt(idText, 10)
  return projects.findIndex(project => project.id === id)
}

server.listen('3000')
