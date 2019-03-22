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

router.get('/:id', (req, res) => {
    const id = req.params.id;

    projectDb
        .get(id)
        .then(project => {
            if (project.length === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            } else {
                res.status(200).json(project);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The project information could not be retrieved." });
        })
})

router.get('/:id/actions', (req,res) => {
    const id = req.params.id;
    
    projectDb
        .getProjectActions(id)
        .then(projectAction => {
            if (projectAction === 0) {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." });
            } else {
                res
                    .status(200)
                    .json(projectAction);
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "Request Failure Occurred"})   
        })
})

router.post('/', (req, res) => {
    const info = req.body;

    if (!info.description || !info.name) {
        res.status(400).json({ errorMessage: "Please provide description and name for the project." });
    } else {
        projectDb
            .insert(req.body)
            .then(project=> {
                res.status(201).json(project);
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the action to the database" });
            })

    }

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDb
        .remove(id)
        .then(project => {
            if (project) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The project information could not be retrieved." });
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const projectInfo = req.body;

    !projectInfo.description || !projectInfo.name
      ?  res
            .status(400)
            .json({ errorMessage: "Please provide Project ID, description and notes for the action." })
    : projectDb
            .update(id, projectInfo)
            .then(postBody => {
                if (postBody === 0) {
                    res
                    .status(404)
                    .json({ message: "The action with the specified ID does not exist." });
                }
                projectDb
                    .get(id)
                    .then(project => {
                        if (project.length ===0) {
                            res
                                .status(404)
                                .json({ message: "The project with the specified ID could not be located." })
                        } else {
                            res.json(project)
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