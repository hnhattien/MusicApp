const express = require('express');
const { connectDB } = require('../databases/DatabaseConnection');
const db = require("../databases/DatabaseConnection.js")
const router = express.Router();
const checkFileExisted = require('../javascript-functions/checkfileexisted');
router.get("/:target", async (req, res, next)=>{
    let targetSearch = req.params.target;
    let sqlSelectCoreMusic = `SELECT m.id, m.title, m.artist_name, m.thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug FROM music m INNER JOIN artist a oN m.artist_id = a.id WHERE m.title LIKE '${targetSearch}%' OR m.slug LIKE '${targetSearch}%'`;
    let sqlSelectUserMusic = `SELECT id, title, artist_name, audio, thumbnail,slug as music_slug FROM music WHERE artist_id IS NULL AND (title LIKE '${targetSearch}%' OR slug LIKE '${targetSearch}%')`;
    let sqlSelectArtist = `SELECT id, title, slug, thumbnail FROM artist WHERE title LIKE '${targetSearch}%' OR slug LIKE '${targetSearch}%'`;
    let sqlSelectAlbum = `SELECT id, title, slug, thumbnail FROM album WHERE title LIKE '${targetSearch}%' OR slug LIKE '${targetSearch}%'`;
    
    let response = {}
    console.log(req.session);
    try{
        let resultMusics = await db.query(sqlSelectCoreMusic);
        if(resultMusics.length !== 0){
            response['musics'] = resultMusics;
        }
        else{
            response['musics'] = [];
        }
        
    }catch(err){
        console.log(err)
    }

    try{
        let resultUserMusics = await db.query(sqlSelectUserMusic);
        if(resultUserMusics.length !== 0){
            response['usermusics'] = resultUserMusics;
        }
        else{
            response['usermusics'] = [];
        }
          
     }catch(err){
         console.log(err)
     }
 
    try{
        let resultArtists = await db.query(sqlSelectArtist);
        if(resultArtists.length !== 0){
            response['artists'] = resultArtists;
        }
        else{
            response['artists'] = [];
        }
      
    }
    catch(err){
        console.log(err)
    }

    try{
        let resultAlbums = await db.query(sqlSelectAlbum);
    
        if(resultAlbums.length !== 0){
            response['albums'] = resultAlbums;
        }
        else{
            response['albums'] = [];
        }
        
    }
    catch(err){
        console.log(err)
    }

    res.send(response);

})

module.exports = router;