const express = require('express'); 

// const postsUser = require('./users/users-router.js')
// const postsPost = require('./posts/posts-router.js')

const server = express();

server.use(express.json());

// server.use('/api/users', postsUser)
// server.use('/api/posts', postsPost)

server.get('/', (req, res) => {
    res.send(`
      <h2>Posts City Baby</h2>
      <p>Welcome to the Jungle</p>
      `);
  });
  
  
  module.exports = server;