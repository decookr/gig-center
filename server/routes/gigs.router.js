var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM gig ORDER BY id', function (errorMakingDatabaseQuery, result) {
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

router.post('/', function (req,res){
    // console.log(req);
    
    var gig = req.body;
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO gig (date, location, start_time, end_time, load_time, gig_song_id, details)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`, [gig.date, gig.location, gig.start_time, gig.end_time, gig.load_time, gig.gig_song_id, gig.details ], 
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