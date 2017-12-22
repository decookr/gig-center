var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
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
});

router.post('/', function (req, res) {
    // console.log(req);
    
    var song = req.body;
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO song (title, artist, length, bpm, key, recording_url, pdf_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`, [song.title, song.artist, song.length, song.bpm, song.key, song.recoring_url, song.pdf_url ], 
            function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201); 
                }
            });
        }
    });
})


// router.delete('/:id', function (req,res){
//     var heroToRemove = req.params.id;
//     pool.connect(function(errorConnectingToDatabase, client, done){
//         if(errorConnectingToDatabase){
//             console.log('Error connecting to database', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`DELETE FROM hero WHERE id=$1;`, [heroToRemove], function(errorMakingQuery, result){
//                 done();
//                 if(errorMakingQuery){
//                     console.log('Error making query', errorMakingQuery);
//                     res.sendStatus(500);
//                 } else{
//                     res.sendStatus(200);
//                 }
//             });
//         }
//     });
// })



module.exports = router;