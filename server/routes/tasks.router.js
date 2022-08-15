const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');  

router.get('/', (req, res) => {
    console.log('In GET /tasks router');
    // Query to run
    const queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then((result) => {
        // SELECT returns rows
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);
    });
});



module.exports = router;