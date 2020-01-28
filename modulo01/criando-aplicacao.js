const express = require('express')

const server = express()

server.get('/teste', (req, res) => {
  console.log('teste')
  // return res.send('Hello World!')  // retornando um texto
  return res.json({ message: 'Hello World...' }) // retornando um objeto
})

server.listen('3000')
