const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const aRouter = require('./actions/actions-router')

server.use(express.json())
server.use("/api/actions", aRouter);

server.get('/', (req, res) => {
  res.send(`<h1> Hello Actions and Projects</h1>`)
})

module.exports = server;
