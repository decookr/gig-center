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


module.exports = router;