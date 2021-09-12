const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection")
const {connectDB} = require("../databases/DatabaseConnection")
const splitArtist = require('../javascript-functions/split-artist');
const fs = require('fs');
//search mp3
function queryArtistsFromArray(artists){
    let baseSqlSelectArtist = "SELECT * FROM artist WHERE ";
    let response = [];
    let sqlQueryArtistList = [];
    if(Array.isArray(artists)){
        artists.forEach((artist_name)=>{
            sqlQueryArtistList.push(`title='${artist_name}'`);
        })
        let sqlSelect = `${baseSqlSelectArtist} ${sqlQueryArtistList.join(" OR ")}` 
        console.log(sqlSelect);
        db.query(sqlSelect).then(result=>{
            console.log(result)
            if(result.length>0){
            let artistObject = {};

            Array.from(result).forEach((artist)=>{
                    Object.keys(artists).forEach((key)=>{
                        artistObject[key] = artist[key];
                    })
                    response.push(artistObject);
            })
            }    
        }).catch((err)=>{
            console.log(err,"Hi");
        })

        
    }

    return response;
    
}

router.get("/randomfetch/:num",async (req, res, next)=>{
    let sqlRandomSelect = `SELECT lyrics, title, thumbnail, artist_name as artist, audio, slug FROM music ORDER BY RAND() LIMIT ${req.params.num}`;
    let response = null;
    await db.query(sqlRandomSelect).then(result=>{
        if(Array.isArray(result)){
            response = result[0];
        }

        res.send(response);
        
    }).catch((err)=>{
        console.log(err);
    })
    

    
})
router.get("/:slug",async (req,res,next)=>{
    let targetSong = req.params.slug;
    let sqlSelectMusic = `SELECT m.lyrics, m.title, m.thumbnail, m.artist_name, m.audio, m.slug FROM music m WHERE m.slug="${targetSong}"`;
    let response = {};
    try{
        let result;
         db.query(sqlSelectMusic).then(result=>{
            result = result;
            if(result.length > 0){
                let songObject = result[0];
                response['title'] = songObject['title'];
                response['thumbnail'] = songObject['thumbnail'];
                
                response['artist'] = songObject['artist_name'];
                response['lyrics'] = songObject['lyrics'];
                response['audio'] = songObject['audio'];
                response['music_slug'] = songObject['music_slug'];
            }
            else{
                response = null;
            }
            
            res.send(response);
        }).cacth(err=>{
            res.send(err);
        });
        

    }catch(err){

    }
    
    
})

module.exports = router;