var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

//GET all gigs
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('SELECT * FROM gig ORDER BY date;', function (errorMakingDatabaseQuery, result) {
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
    }
    else {
        res.sendStatus(403);
    }
});

//GET a user's assigned gigs
router.get('/user_gig', function (req, res) {
    console.log(req.params);
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT users.id, users.first_name AS member_list, gig.id AS gig_id, gig.location AS gig_location, 
            gig.date AS gig_date, gig.start_time AS gig_start, gig.end_time AS gig_end FROM user_gig
            JOIN "users" ON users.id = user_gig.users_id
            JOIN "gig" ON gig.id = user_gig.gig_id
            WHERE user_gig.users_id=$1
            ORDER BY date;`, [req.user.id], function (errorMakingDatabaseQuery, result) {
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
    }
    else {
        res.sendStatus(403);
    }
});

//add a gig to gig table 
router.post('/add-gig', function (req, res) {
    console.log(req.body);
    var gig = req.body;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO gig (date, location, start_time, end_time, load_time, details)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id AS gig_id;`, [gig.date, gig.location, gig.start_time, gig.end_time, gig.load_time, gig.details],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                            // console.log('',result.res.gig_id);

                        }
                    });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
})

//assign users to a gig in user_gig table
router.post('/assign-users', function (req, res) {
    var userToAdd = req.body.users.users_id;
    var gigId = req.body.gigId.gig_id;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                var userGigPromises = [];
                for (let i = 0; i < userToAdd.length; i++) {
                    var newUserGigPromise = client.query(`INSERT INTO user_gig (users_id, gig_id) VALUES ($1, $2);`, [userToAdd[i], gigId]);
                    userGigPromises.push(newUserGigPromise);
                }
            }
            Promise.all(userGigPromises).then(function (resultOfAllPromises) {
                res.sendStatus(201);
            }).catch(function (err) {
                console.log('Promise.all did not work!', err);
                res.sendStatus(500);
            })
        });
    }
    else {
        res.sendStatus(403);
    }
})

// Delete a gig from gig table
router.delete('/:id', function (req, res) {
    var gigToRemove = req.params.id;
    if (req.isAuthenticated()) {
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
    }
    else {
        res.sendStatus(403);
    }
})

// Edit a gig
router.put('/', function (req, res) {
    var gigToEdit = req.body;
    if (req.isAuthenticated()) {
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
    }
    else {
        res.sendStatus(403);
    }
})

module.exports = router;