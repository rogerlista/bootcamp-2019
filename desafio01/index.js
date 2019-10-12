const express = require('express')

const server = express()

const projects = []

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.listen(3000)
