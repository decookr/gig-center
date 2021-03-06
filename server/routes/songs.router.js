var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// Get all songs
router.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query('SELECT * FROM song ORDER BY title', function (errorMakingDatabaseQuery, result) {
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

// Add a song to the songs database
router.post('/', function (req, res) {
    var song = req.body;
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO song (title, artist, length, bpm, key, recording_url)
            VALUES ($1, $2, $3, $4, $5, $6);`, [song.title, song.artist, song.length, song.bpm, song.key, song.recording_url],
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
    }
    else {
        res.sendStatus(403);
    }
})

//Add checked songs to the selected gig in gig_song table (Set List)
router.post('/gig-song', function (req, res) {
    // console.log(req);
    var song = req.body;
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO gig_song (gig_id, song_id)
            VALUES ($1, $2);`, [song.gig_id, song.song_id],
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
    }
    else {
        res.sendStatus(403);
    }
})

// Delete a song from songs table
router.delete('/:id', function (req, res) {
    var songToRemove = req.params.id;
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`DELETE FROM song WHERE id=$1;`, [songToRemove], function (errorMakingQuery, result) {
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

// Edit song information
router.put('/', function (req, res) {
    var songToEdit = req.body;
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE song SET title=$1, artist=$2, length=$3, bpm=$4, key=$5, recording_url=$6
            WHERE "id" = $7;`, [songToEdit.title, songToEdit.artist, songToEdit.length, songToEdit.bpm, songToEdit.key, songToEdit.recording_url, songToEdit.id], function (errorMakingQuery, result) {
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