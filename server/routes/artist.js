const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection")


router.get('/:target',async (req, res,next)=>{
    let targetArtist = req.params.target;
    let sqlSelectArtist = `SELECT * FROM artist WHERE slug='${targetArtist}'`;
    let artistObject; 
    let response = {};
    try{
        let result = await db.query(sqlSelectArtist);
        if(result.length !== 0){
            artistObject = result[0];
            response['artist'] = artistObject;
        }
        else{
            response['artist'] = undefined;
        }
        
    }catch(err){

    }
    let sqlSelectMusic = `SELECT * FROM music WHERE artist_name="${artistObject.title}"`;
    try{
        let result = await db.query(sqlSelectMusic);
        if(result.length !== 0){
            response['musics'] = result;
        }
        else{
            response['musics'] = [];
        }
    }catch(err){
        
    }
    let sqlSelectAlbum = `SELECT * FROM album WHERE artist_id='${artistObject.id}'`;
    try{
        let result = await db.query(sqlSelectAlbum);
        if(result.length !== 0){
            response['album'] = result;
        }
        else{
            response['album'] = [];
        }
    }catch(err){

    }
    res.send(response);
})

module.exports = router;