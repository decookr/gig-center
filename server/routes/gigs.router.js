var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM gig ORDER BY date', function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    console.log(req);

    var gig = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO gig (date, location, start_time, end_time, load_time, gig_song_id, details)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            INSERT INTO user_gig (users_id, gig_id) 
            VALUES ($8, $9);`, [gig.date, gig.location, gig.start_time, gig.end_time, gig.load_time, gig.gig_song_id, gig.details, gig.users_id, gig.gig_id],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
})


router.delete('/:id', function (req, res) {
    var gigToRemove = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM gig WHERE id=$1;`, [gigToRemove], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
})

router.put('/', function (req, res) {
    var gigToEdit = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE gig SET date=$1, location=$2, start_time=$3, end_time=$4, load_time=$5, gig_song_id=$6, details=$7
            WHERE "id" = $8;`, [gigToEdit.date, gigToEdit.location, gigToEdit.start_time, gigToEdit.end_time, gigToEdit.load_time, gigToEdit.gig_song_id, gigToEdit.details, gigToEdit.id], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
})

module.exports = router;