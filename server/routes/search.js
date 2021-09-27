const express = require('express');
const { connectDB } = require('../databases/DatabaseConnection');
const db = require("../databases/DatabaseConnection.js")
const router = express.Router();
const checkFileExisted = require('../javascript-functions/checkfileexisted');
router.get("/:target", async (req, res, next)=>{
    let targetSearch = req.params.target;
    let sqlSelectMusic = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN artist a on m.artist_id = a.id INNER JOIN lyrictable l ON m.id = l.songid WHERE m.title LIKE '${targetSearch}%' OR m.artist_name LIKE '${targetSearch}%' OR m.slug LIKE '${targetSearch}%' UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name,m.thumbnail as music_thumbnail, m.artist_id As artist_thumbnail, m.audio, m.slug as music_slug, m.artist_id as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN lyrictable l ON l.songid = m.id WHERE m.artist_id IS NULL AND (m.title LIKE '${targetSearch}%' OR m.slug LIKE '${targetSearch}%' OR m.artist_name LIKE '${targetSearch}%')`;
    let sqlSelectArtist = `SELECT id, title, slug, thumbnail FROM artist WHERE title LIKE '${targetSearch}%' OR slug LIKE '${targetSearch}%'`;
    let sqlSelectAlbum = `SELECT id, title, slug, thumbnail FROM album WHERE title LIKE '${targetSearch}%' OR slug LIKE '${targetSearch}%'`;
    
    let response = {}
    let resultLikeUser = [];
    if(req.user){
        let sqlSelectLikedUser = `SELECT * FROM liketable WHERE userid=?`;
        resultLikeUser = await db.query(sqlSelectLikedUser, [String(req.user.id)]);
    }
    try{
        
        db.query(sqlSelectMusic).then(resultMusic=>{
            let newResultMusic = Array.from(resultMusic);
            newResultMusic.map((music)=>{
                if(Array.from(resultLikeUser).filter(likedMusic=>likedMusic.songid === music.id).length !== 0){
                    music['liked'] = true
                    return music;
                }
                else{
                    return music;
                }
            })
            response['musics'] = newResultMusic;
        })
        .then(()=>{
            db.query(sqlSelectArtist).then((resultArtist)=>{
                response['artists'] = resultArtist;
            })
            .then(()=>{
                db.query(sqlSelectAlbum).then((resultAlbum)=>{
                    response['albums'] = resultAlbum;
                }).then(()=>{
                    res.send(response);
                }).catch(err=>{
                    res.send({error: {message: String(err)}});
                })
            })
        })
        .catch(err=>{
            res.send({error: {message: String(err)}});
        })
        
        
    }catch(err){
        res.send({error: {message: String(err)}})
        console.log(err)
    }
    
})

module.exports = router;