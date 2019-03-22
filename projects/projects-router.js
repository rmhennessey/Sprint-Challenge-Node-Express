const express = require('express');

const router = express.Router();

const projectDb = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    projectDb
        .get()
        .then(projectDb => {
            res.status(200).json(projectDb);
        })
        .catch(error => {
            res.status(500).json({ error: "This action could not be retrieved." })
        })
})


module.exports = router;