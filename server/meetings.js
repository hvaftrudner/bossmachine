const express = require('express');
const meetingsRouter = express.Router();

const { getAllFromDatabase,
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase, 
    deleteFromDatabasebyId, 
    deleteAllFromDatabase,
    createMeeting} = require('./db');


// get /api/meetings to get an array of all meetings
meetingsRouter.get('/', (req, res, next ) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    if(newMeeting){
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/meetings to delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
    const removeMeetings = deleteAllFromDatabase('meetings');
    if(removeMeetings){
        res.status(204).send();
    }else {
        res.status(500).send();
    }
    
});


module.exports = meetingsRouter;