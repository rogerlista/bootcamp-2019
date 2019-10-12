const express = require('express')

const server = express()

server.get('/teste', (req, res) => {
  res.json({ message: 'Hello World' })
})

server.listen(3000)
