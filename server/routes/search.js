const express = require('express');
const { connectDB } = require('../databases/DatabaseConnection');
const db = require("../databases/DatabaseConnection.js")
const router = express.Router();

router.get("/:target",(req, res, next)=>{
    let targetSearch = req.params.target;
    if(!db){
        connectDB();
    }
    let sqlSelectMusic = `SELECT title FROM music WHERE title LIKE '${targetSearch}%'`;
    let sqlSelectArtist = `SELECT artist_name FROM music WHERE artist_name LIKE '${targetSearch}%'`;
    let sqlSelectAlbum = `SELECT title FROM album WHERE artist_name LIKE '${targetSearch}%'`;
    let dataSearch = {}
    db.query(sqlSelectMusic,(err,result)=>{
        if(err) throw err;
        dataSearch['music'] = result;
        db.query(sqlSelectArtist,(err,result)=>{
            if(err) throw err;
            dataSearch['artist'] = result;
            db.query(sqlSelectAlbum,(err,result)=>{
                if(err) throw err;
                dataSearch['album'] = result;
                res.send(dataSearch);
            })
            
        })
    })

    

})

module.exports = router;