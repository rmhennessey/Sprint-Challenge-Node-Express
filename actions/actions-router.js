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

router.get('/:id', (req, res) => {
    const id = req.params.id;

    actionDb
        .get(id)
        .then(action => {
            if (action.length === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." });
            } else {
                res.status(200).json(action);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The action information could not be retrieved." });
        })
})

router.post('/', (req, res) => {
    const info = req.body;

    if (!info.project_id || !info.description || !info.notes) {
        res.status(400).json({ errorMessage: "Please provide Project ID, description and notes for the action." });
    } else {
        actionDb
            .insert(req.body)
            .then(action=> {
                res.status(201).json(action);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the action to the database" });
            })

    }

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb
        .remove(id)
        .then(action => {
            if (action) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The action information could not be retrieved." });
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const actionInfo = req.body;

    !actionInfo.project_id || !actionInfo.description || !actionInfo.notes
      ?  res
            .status(400)
            .json({ errorMessage: "Please provide Project ID, description and notes for the action." })
    : actionDb 
            .update(id, actionInfo)
            .then(postBody => {
                if (postBody === 0) {
                    res
                    .status(404)
                    .json({ message: "The action with the specified ID does not exist." });
                }
                actionDb 
                    .get(id)
                    .then(action => {
                        if (action.length ===0) {
                            res
                                .status(404)
                                .json({ message: "The action with the specified ID could not be located." })
                        } else {
                            res.json(action)
                        }
                    })
                    .catch(error => {
                        res
                            .status(500)
                            .json({ message: "Error occurred while locating action." })
                    })
            })
            .catch (error => {
                res
                    .status(500)
                    .json({ error: "The action info could not be modified"})
            })
        });

module.exports = router;