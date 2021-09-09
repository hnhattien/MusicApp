const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection")
const {connectDB} = require("../databases/DatabaseConnection")
//search mp3
router.get("/:target",(req,res,next)=>{
    if(!db){
        connectDB();
    }
    let targetSong = req.params.target;
    let targetAudio = `^${targetSong}\.(mp3|wav|m4a)$`
    let sqlSelectAudio = `SELECT * FROM music WHERE REGEXP_LIKE(mp3,'${targetAudio}')`;
    db.query(sqlSelectAudio,(err,result)=>{
        if(err) {res.send("Error database"); throw err};
        res.send(result);
    })
    
})

module.exports = router;