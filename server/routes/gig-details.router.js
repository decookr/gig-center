var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

//GET specific gig details
router.get('/', function (req, res) {
    var gigId = req.query.gigId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT * FROM gig WHERE id=$1;`, [gigId], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows[0]);
                    }
                });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
});

//GET song list for a specific gig from gig_song table
router.get('/gigSongs', function (req, res) {
    var gigId = req.query.gigId;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`SELECT gig_song.id, gig_song.song_order, gig.id AS gig_id, song.title AS song_title, song.artist AS song_artist, 
            song.bpm AS song_bpm, song.key AS song_key, song.length AS song_length, song.recording_url as song_recording_url FROM gig_song
            JOIN "gig" ON gig.id = gig_song.gig_id
            JOIN "song" ON song.id = gig_song.song_id
            WHERE gig_id=$1
            ORDER BY gig_song.song_order
            ;`, [gigId], function (errorMakingDatabaseQuery, result) {
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

// Delete a song from gig_song table (remove from specific gig)
router.delete('/:id', function (req, res) {
    var songToRemove = req.params.id;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`DELETE FROM gig_song WHERE id=$1;`, [songToRemove], function (errorMakingQuery, result) {
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

// Edit song order for specified gig
router.put('/', function (req, res) {
    var songToEdit = req.body;
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('Error connecting to database', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE gig_song SET song_order=$1
            WHERE "id" = $2;`, [songToEdit.song_order, songToEdit.id], function (errorMakingQuery, result) {
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