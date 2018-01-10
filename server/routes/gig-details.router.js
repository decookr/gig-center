var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

//GET specific gig details
router.get('/', function (req, res) {
    var gigId = req.query.gigId;    
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
});

router.get('/gigSongs', function (req, res) {
    var gigId = req.query.gigId;    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT gig_song.id, gig.id AS gig_id, song.title AS song_title, song.artist AS song_artist, 
            song.bpm AS song_bpm, song.key AS song_key, song.length AS song_length, song.recording_url as song_recording_url FROM gig_song
            JOIN "gig" ON gig.id = gig_song.gig_id
            JOIN "song" ON song.id = gig_song.song_id
            WHERE gig_id=$1
            ORDER BY gig_song.id
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
});

module.exports = router;