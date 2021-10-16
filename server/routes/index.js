var express = require('express');
var router = express.Router();

const db = require('../databases/DatabaseConnection');










/* GET home page. */
router.get('/index', async function (req, res, next) {
  console.log(req.user,"req.user");
  if(req.user){
    let sqlSelectCoreMusic = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, a.thumbnail as artist_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN artist a oN m.artist_id = a.id INNER JOIN lyrictable l ON l.songid = m.id UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id As artist_thumbnail, m.audio, m.slug as music_slug, artist_id as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN lyrictable l ON m.id = l.songid WHERE m.artist_id IS NULL`;
    // let sqlSelectUserMusic = `SELECT id, upload_time, title, artist_name, audio, thumbnail,slug as music_slug FROM music WHERE artist_id IS NULL ORDER BY upload_time DESC`;
    let sqlSelectLikedUser = `SELECT * FROM liketable WHERE userid=?`;
    let resultLikeUser = await db.query(sqlSelectLikedUser, [String(req.user.id)]);
    let response = {}
    db.query(sqlSelectCoreMusic).then(resultCoreMusic =>{

      let newResultCoreMusic = Array.from(resultCoreMusic).map((music)=>{

        if(Array.from(resultLikeUser).filter(likedMusic=>likedMusic.songid === music.id).length !== 0){
          music['liked'] = true
          return music;
        }
        else{
          return music;
        }
      })

      response['musics'] = newResultCoreMusic;
    }).catch(err=>{
      response['error'] = {message: String(err)};
    }).then(()=>{
      res.send(response);
    })
    // }).then(()=>{
    //   db.query(sqlSelectUserMusic).then(resultUserMusic => {
    //     let newResultUserMusic = Array.from(resultUserMusic).map((music)=>{
    //       if(Array.from(resultLikeUser).filter((likedMusic)=>likedMusic.songid = music.id).length !== 0){
    //         music['liked'] = true
    //         return music;
    //       }
    //       else{
    //         return music;
    //       }
    //     })
    //     response['usermusics'] = newResultUserMusic;
    //   }).catch(err=>{
    //     response['error'] = {message: String(err)};
    //   }).then(()=>{
    //     res.send(response);
    //   })
    // })
  }
  else{
    let response = {}
    let sqlSelectCoreMusic = `SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail ,m.audio, m.slug as music_slug, a.slug as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN artist a oN m.artist_id = a.id INNER JOIN lyrictable l ON l.songid = m.id UNION SELECT m.id, m.upload_time, m.title, m.artist_id, m.artist_name, m.thumbnail as music_thumbnail, m.artist_id as artist_thumbnail, m.audio, m.slug as music_slug, slug as artist_slug, m.viewcount, l.lyrics FROM music m INNER JOIN lyrictable l ON m.id = l.songid WHERE m.artist_id IS NULL`;
    // let sqlSelectUserMusic = `SELECT id, title, artist_name, audio, thumbnail, upload_time,slug as music_slug FROM music WHERE artist_id IS NULL ORDER BY upload_time DESC`;
    db.query(sqlSelectCoreMusic).then((resultCoreMusic)=>{
        response['musics'] = resultCoreMusic;
    }).catch(err=>{
      response['error'] = {message: String(err)};
    }).then(()=>{
      res.send(response);
    })

    // }).then(()=>{
    //   db.query(sqlSelectUserMusic).then(resultUserMusics=>{

    //       response['usermusics'] = resultUserMusics;


    //   }).catch(err=>{
    //     response['error'] = {message: String(err)}
    //   }).then(()=>{
    //     res.send(response);
    //   })
    // })
  }










});

// GET Category

router.get("/category/:cat", (req, res, next) => {


  let catname = req.params.cat;
  let sqlSelectCat = `SELECT * FROM user`
  db.query()

})




module.exports = router;
