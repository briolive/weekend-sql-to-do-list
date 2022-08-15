const express = require('express');
const { RowDescriptionMessage } = require('pg-protocol/dist/messages.js');
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

router.post('/', (req, res) => {
    const todo = req.body;
    const queryText = `INSERT INTO "tasks" ("task", "complete")
    VALUES ($1, $2);`
    pool.query(queryText, [todo.task, todo.complete])
    .then((results) => {
        console.log(results);
        res.send(results); // SUCCESS 200
    })
    .catch((error) => {
        console.log('ERROR in POST /tasks', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log('DELETE /tasks', taskId);
    const queryText = `DELETE FROM "tasks"
                        WHERE "id" = $1`;
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
});

router.put('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log(req.body);
    const queryText = `UPDATE "tasks" SET "complete" = 'yes'
                        WHERE "id" = $1`;
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
});


module.exports = router;