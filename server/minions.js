const express = require('express');
const minionsRouter = express.Router();
//import helper functions here

const { getAllFromDatabase,
        getFromDatabaseById, 
        addToDatabase, 
        updateInstanceInDatabase, 
        deleteFromDatabasebyId, 
        deleteAllFromDatabase} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionIndex = getFromDatabaseById('minions', id);
    
    if(minionIndex){
        req.minionIndex = minionIndex;
        next();
        
    }else{
        res.status(404).send('No minion found');
    }

})


// get /api/minions to get an array of all minions

minionsRouter.get('/', (req, res, next) => { 
    const minion = getAllFromDatabase('minions');
    res.send(minion);
});

// post /api/minions to create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const receivedMinion = addToDatabase('minions', req.body);
    if(receivedMinion){
        res.status(201).send(receivedMinion);
    }else {
        res.status(404).send();
    }
});

// get /api/minions/:minionID to update a singe minion by ID 
minionsRouter.get('/:minionId', (req, res, next) => {
    
    res.send(req.minionIndex);
});

// PUT /api/minions/:minionID to update a single minion by ID
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if(updatedMinion){
        res.status(201).send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/minions/:minionID to delete a single minion by ID
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if(deleteMinion){
        res.status(204).send();
    } else {
        res.status(500).send();
    }
    
});

//------------------------------------------------------
//Bonus : Work Part
//------------------------------------------------------

//Get all minion work 
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(work => {
        
        return work.minionId === req.params.minionId;      
        
    });
    res.send(minionWork);
});

//Post /api/minions/:minionId/work to create a new work object and save it to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body);
    newWork.minionId === req.params.minionId;
    res.status(201).send(newWork);
})


//Params to identify workID
minionsRouter.param('workId', (req, res, next, id) => {
    const workIndex = getFromDatabaseById('work', id);
    if(workIndex){
        req.workIndex = workIndex;
        next();
    }else{
        res.status(404).send();
    }
});

//Put /api/minions/:minionId/work:workId to update a single work by id
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {

    if(req.params.minionId !== req.body.minionId){
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        if(updatedWork){
            res.status(201).send(updatedWork);
        }else{
            res.status(404).send();
        }
    }
});

//DELETE /api/minions/:minionId/work/:workId to delete a single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    

    const deleteWork = deleteFromDatabasebyId('work', req.params.workId);
        if(deleteWork){
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    
})

module.exports = minionsRouter;


