const express = require('express'); 

const actionPost = require('./actions/actions-router')
const projectPost = require('./projects/projects-router')

const server = express();

server.use(express.json());

server.use('/api/actions', actionPost)
server.use('/api/projects', projectPost)

server.get('/', (req, res) => {
    res.send(`
      <h2>Posts City Baby</h2>
      <p>Welcome to the Jungle</p>
      `);
  });
  
  
  module.exports = server;