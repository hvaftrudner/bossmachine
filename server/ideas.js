const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase,
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase, 
    deleteFromDatabasebyId, 
    deleteAllFromDatabase} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideasIndex = getFromDatabaseById('ideas', id);
    if (ideasIndex){
        req.ideasIndex = ideasIndex;
        next();
    } else {
        res.status(404).send('No ideas found');
    }
})

// Get /api/ideas to get an array of all ideas 
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
})

// Post /api/ideas to create a new idea and save it to the databse
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    receivedIdea = addToDatabase('ideas', req.body);
    if(receivedIdea){
        res.status(201).send(receivedIdea);
        next();
    } else {
        res.status(404).send();
    }
})

// GET /api/ideas/:ideaID to get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.ideasIndex);
})

// PUT /api/ideas/:ideaID to update a single idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if(updatedIdea){
        res.status(201).send(updatedIdea);
    } else {
        res.status(404).send();
    }
})

// DELETE /api/ideas/:ideaID to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deleteIdea){
        res.status(204).send();
    } else {
        res.status(500).send();
    }
})

module.exports = ideasRouter;

