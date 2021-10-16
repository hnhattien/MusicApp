const express = require("express");
const router = express.Router();
const db = require("../databases/DatabaseConnection")
const ROLE = require('../authenticate/RoleData.js');
router.get('/artistinfo', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    let sqlSelectArtist = `SELECT * FROM artist ORDER BY adddate DESC`;
    db.query(sqlSelectArtist).then(resultArtist => {
      res.send(resultArtist);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })
  }
  else{
    res.send({error: {message: "Yout not permit to see artist infomation. Please login as admin."}})
  }
})
router.get('/:target',async (req, res,next)=>{
    let slug = req.params.target;
    let sqlSelectArtist = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN artist a oN m.artist_id = a.id INNER JOIN lyrictable l ON l.songid = m.id WHERE a.slug=?`;
    let artistObject;
    let response = {};

    db.query(sqlSelectArtist,[slug]).then(result=>{
        if(result.length > 0){
            let musics = [];
            result.forEach(el=>{
                musics.push({
                    id: el.id,
                    upload_time: el.upload_time,
                    title: el.title,
                    artist_id: el.artist_id,
                    artist_name: el.artist_name,
                    music_thumbnail: el.music_thumbnail,
                    audio: el.audio,
                    music_slug: el.music_slug,
                    artist_slug: el.artist_slug,
                    viewcount: el.viewcount,
                    lyrics: el.lyrics
                });
            })
            response = {
                artist_id: result[0].artist_id,
                title: result[0].artist_name,
                artist_slug: result[0].artist_slug,
                artist_thumbnail: result[0].artist_thumbnail,
                musics
            }
            res.send(response);
        }
        else{
          let sqlSelectArtist = `SELECT * FROM artist WHERE slug=?`;
          db.query(sqlSelectArtist,[slug]).then(result=>{
            if(result.length > 0){
              const response = {
                artist_id: result[0].id,
                title: result[0].title,
                artist_slug: result[0].slug,
                artist_thumbnail: result[0].thumbnail,
              };
              res.send(response);
            }
            else{

              res.send({error: {message: "No info about this artist."}});

            }



          })

        }

    }).catch(err=>{
        res.send({error: {message: String(err)}});
    });
})

module.exports = router;
