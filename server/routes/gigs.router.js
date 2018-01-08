var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

//GET all gigs
router.get('/', function (req, res) {
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
});

//GET a user's assigned gigs
router.get('/user_gig', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT users.id, users.first_name AS member_list, gig.location AS gig_location, gig.date AS gig_date, gig.start_time AS gig_start, gig.end_time AS gig_end FROM user_gig
            JOIN "users" ON users.id = user_gig.users_id
            JOIN "gig" ON gig.id = user_gig.gig_id;`, function (errorMakingDatabaseQuery, result) {
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

//GET specific gig details
router.get('/:id', function (req, res) {
    console.log('this gig:',req.body);
    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM gig WHERE users_id=$1;`, [req.user.id], function (errorMakingDatabaseQuery, result) {
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

//add a gig to gig table and assign users to a gig in user_gig table
router.post('/', function (req, res) {
    // console.log(req.body);
    var gig = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO gig (date, location, start_time, end_time, load_time, gig_song_id, details)
            VALUES ($1, $2, $3, $4, $5, $6, $7); 
            INSERT INTO user_gig (users_id, id) 
            VALUES ($8, $9);`, [gig.date, gig.location, gig.start_time, gig.end_time, gig.load_time, gig.gig_song_id, gig.details, gig.users_id, gig.id],
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