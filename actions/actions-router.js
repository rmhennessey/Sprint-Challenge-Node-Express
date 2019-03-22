const express = require('express');

const router = express.Router();

const actionDb = require ('../data/helpers/actionModel')

router.get('/', (req, res) => {
    actionDb
        .get()
        .then(actionDb => {
            res.status(200).json(actionDb);
        })
        .catch(error => {
            res.status(500).json({ error: "This action could not be retrieved." })
        })
})


module.exports = router;