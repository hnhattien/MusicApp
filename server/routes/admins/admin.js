const router = require('express').Router();
const db = require("../../databases/DatabaseConnection");
const crypto = require('crypto');
const slug = require('slug');
const capitalize = require('../../javascript-functions/capitalize.js');
let passport = require('passport');
const ROLE = require('../../authenticate/RoleData.js');
const fs = require('fs');
router.get(`/`,async (req,res, next) => {
  let sqlUser = `SELECT * FROM user`;
  let sqlAlbum = `SELECT * FROM album`;
  let sqlArtist = `SELECT * FROM artist`;
  let sqlSong = `SELECT * FROM music`;
  let sqlTodayUser = `SELECT * FROM user where joinday >= CURRENT_DATE AND joinday < date_add(CURRENT_DATE, INTERVAL 1 DAY)`
  let sqlTodayAlbum = `SELECT * FROM album where madedate >= CURRENT_DATE AND madedate < date_add(CURRENT_DATE, INTERVAL 1 DAY)`;
  let sqlTodaySong = `SELECT * FROM music where upload_time >= CURRENT_DATE AND upload_time < date_add(CURRENT_DATE, INTERVAL 1 DAY)`;
  let sqlTodayArtist = `SELECT * FROM artist where adddate >= CURRENT_DATE AND adddate < date_add(CURRENT_DATE, INTERVAL 1 DAY)`;
  let response = {userTotal: 0,todayNewUser: 0,
    songTotal: 0, todayNewSong: 0,
    albumTotal: 0, todayNewAlbum: 0,
    artistTotal: 0, todayNewArtist: 0

  };
  try{
    let resultUser = await db.query(sqlUser);
    let userTotal = resultUser.length;
    if(userTotal > 0){
      response.userTotal = userTotal;
    }
    let resultSong = await db.query(sqlSong);
    let songTotal = resultSong.length;
    if(songTotal > 0){
      response.songTotal = songTotal;
    }
    let resultArtist = await db.query(sqlArtist);
    let artistTotal = resultArtist.length;
    if(artistTotal > 0){
      response.artistTotal = artistTotal;
    }
    let resultAlbum = await db.query(sqlAlbum);
    let albumTotal = resultAlbum.length;
    if(albumTotal > 0){
      response.albumTotal = albumTotal;
    }
   //New Content Today
    let resultNewSong = await db.query(sqlTodaySong);
    let newSongTotal = resultNewSong.length;
    if(newSongTotal > 0){
      response.todayNewSong = newSongTotal;
    }

    let resultNewAlbum = await db.query(sqlTodayAlbum);
    let newAlbumTotal = resultNewAlbum.length;
    if(newAlbumTotal > 0){
      response.todayNewAlbum = newAlbumTotal;
    }

    let resultNewArtist = await db.query(sqlTodayArtist);
    let newArtistTotal = resultNewArtist.length;
    if(newArtistTotal > 0){
      response.todayNewArtist = newArtistTotal;
    }

    let resultNewUser = await db.query(sqlTodayUser);
    let newUserTotal = resultNewUser.length;
    if(newUserTotal > 0){
      response.todayNewUser = newUserTotal;
    }

    res.send(response);
  }
  catch(err){
    res.send({error: {message: String(err)}});
  }


})
router.post('/deleteuser',(req, res, next)=>{
    if(req.user && req.user.role === ROLE.ADMIN){
      if(req.body.id){
        let sqlDelete = `DELETE FROM user WHERE id=? LIMIT 1`;
        db.query(sqlDelete,[req.body.id]).then(result=>{
          res.send({message: `Deleted ${req.body.username} from system.`});
        }).catch(err=>{
          res.send({error: {message: String(err)}});
        })
      }
      else{
        res.status(403).send({error: {message: "Bad Request. You must to provide a userId."}});
      }
    }
    else{
      res.send({error:{message: "You not permit to perform this action."}});
    }
})

router.post('/deletesong',async (req, res, next)=>{
    if(req.user && req.user.role === ROLE.ADMIN){
      if(req.body.songid){
        let sqlEnableForeignKeyChecks = 'SET FOREIGN_KEY_CHECKS=1'; // to re-enable them
        let sqlDelete = `SET FOREIGN_KEY_CHECKS=0; DELETE FROM music WHERE id=? LIMIT 1`;

        try{
          await db.query(sqlDelete,[req.body.songid]);
          res.send({message: `Deleted music named ${req.body.songname} from system.`});
        }catch(err){
          res.send({error: {message: String(err)}});
        }
      }
      else{
        res.status(403).send({error: {message: "Bad Request. You must to provide a songId."}});
      }
    }
    else{
      res.send({error:{message: "You not permit to perform this action."}});
    }
})
router.get("/song", async (req, res, next) => {

  if(req.user && req.user.role === ROLE.ADMIN){
    let sqlSelectSong = `SELECT * FROM music`;
    db.query(sqlSelectSong).then(resultMusic=>{
      res.send(resultMusic);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })
  }
  else{
    res.send({error: {message: "Yout not permit to see song infomation. Please login as admin."}})
  }
})
router.post('/updatesong', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.music){
      let sqlUpdate = `UPDATE music SET
       title = ?,audio=?,thumbnail=?,
       slug = ?, artist_name = ?, cat_id = ?,
       public_year = ?,
       artist_id = ?, viewcount = ? WHERE id=?`;

      try{
            let music = req.body.music;
            await db.query(sqlUpdate,[
              music.title,
              music.audio,
              music.thumbnail,
              music.slug,
              music.artist_name,
              music.cat_id,
              music.public_year,
              music.artist_id,
              music.viewcount,
              music.id
            ]);
            res.send({message: `Updated music named ${music.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a music id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/deleteartist', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.artistid){
      let sqlEnableForeignKeyChecks = 'SET FOREIGN_KEY_CHECKS=1'; // to re-enable them
      let sqlDelete = `SET FOREIGN_KEY_CHECKS=0; DELETE FROM artist WHERE id=? LIMIT 1; DELETE FROM music WHERE artist_id=?`;

      try{
        await db.query(sqlDelete,[req.body.artistid,req.body.artistid]);
        res.send({message: `Deleted artist named ${req.body.artistname} from system.`});
      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a artistid."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/updateartist', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.artist){
      let sqlUpdate = `UPDATE artist SET
       title = ?,thumbnail=?,
       slug = ?
         WHERE id=?`;

      try{
            let artist = req.body.artist;
            await db.query(sqlUpdate,[
              artist.title,
              artist.thumbnail,
              artist.slug,
              artist.id
            ]);
            res.send({message: `Updated artist named ${artist.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a artist id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/changeartistthumbnail', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.filename && req.body.base64Image && req.body.artistid){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;

      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/images/${filename}`,rawData, {encoding: "base64"},(err)=>{

      })
      const sqlUpdate = `UPDATE artist SET thumbnail=? WHERE id= ?`;
      db.query(sqlUpdate,[filename, req.body.artistid]).then(result => {
        res.send({message: "Update avatar artist successfully."});
      }).catch(err =>{
        res.send({error: {message: String(err)}});
      })
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a file."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.get('/album', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    let sqlSelectAlbum = `SELECT * FROM album`;
    db.query(sqlSelectAlbum).then(resultAlbum => {
      res.send(resultAlbum);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })
  }
  else{
    res.send({error: {message: "Yout not permit to see album infomation. Please login as admin."}})
  }
})

router.post('/changealbumthumbnail', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.filename && req.body.base64Image && req.body.albumid){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;

      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/images/${filename}`,rawData, {encoding: "base64"},(err)=>{

      })
      const sqlUpdate = `UPDATE album SET thumbnail=? WHERE id= ?`;
      db.query(sqlUpdate,[filename, req.body.albumid]).then(result => {
        res.send({message: `Update avatar for album ${req.body.albumname} successfully.`});
      }).catch(err =>{
        res.send({error: {message: String(err)}});
      })
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a file."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/updatealbum', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.album){
      let sqlUpdate = `UPDATE album SET
       title = ?,thumbnail=?,
       slug = ?,
       cat_id=?,
       artist_id=?
         WHERE id=?`;

      try{
            let album = req.body.album;
            await db.query(sqlUpdate,[
              album.title,
              album.thumbnail,
              album.slug,
              album.cat_id,
              album.artist_id,
              album.id
            ]);
            res.send({message: `Updated album named ${album.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a album id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/deletealbum', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.albumid){
      let sqlEnableForeignKeyChecks = 'SET FOREIGN_KEY_CHECKS=1'; // to re-enable them
      let sqlDelete = `SET FOREIGN_KEY_CHECKS=0; DELETE FROM album WHERE id=? LIMIT 1`;

      try{
        await db.query(sqlDelete,[req.body.albumid]);
        res.send({message: `Deleted album named ${req.body.albumname} from system.`});
      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a album id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/changesongthumbnail', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.filename && req.body.base64Image && req.body.songid){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;

      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/musics/thumbnails/${filename}`,rawData, {encoding: "base64"},(err)=>{

      })
      const sqlUpdate = `UPDATE music SET thumbnail=? WHERE id= ?`;
      db.query(sqlUpdate,[filename, req.body.songid]).then(result => {
        res.send({message: `Update avatar for song ${req.body.songname} successfully.`});
      }).catch(err =>{
        res.send({error: {message: String(err)}});
      })
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a file."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.get('/category', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    let sqlSelectCategory = `SELECT * FROM category ORDER BY id DESC`;
    db.query(sqlSelectCategory).then(resultCategory => {
      res.send(resultCategory);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })
  }
  else{
    res.send({error: {message: "Yout not permit to see category infomation. Please login as admin."}})
  }
})

router.post('/updatecategory', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.category){
      let sqlUpdate = `UPDATE category SET
       title = ?,thumbnail=?,
       slug = ?
         WHERE id=?`;

      try{
            let category = req.body.category;
            await db.query(sqlUpdate,[
              category.title,
              category.thumbnail,
              category.slug,
              category.id
            ]);
            res.send({message: `Updated category named ${category.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a category id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/deletecategory', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.categoryid){
      let sqlEnableForeignKeyChecks = 'SET FOREIGN_KEY_CHECKS=1'; // to re-enable them
      let sqlDelete = `SET FOREIGN_KEY_CHECKS=0; DELETE FROM category WHERE id=? LIMIT 1`;

      try{
        await db.query(sqlDelete,[req.body.categoryid]);
        res.send({message: `Deleted category named ${req.body.categoryname} from system.`});
      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a category id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})
router.post('/addcategory', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.category){
      let sqlInsert = `INSERT INTO category(title, thumbnail, slug) VALUES(?,?,?)`;

      try{
            let category = req.body.category;
            await db.query(sqlInsert,[
              category.title,
              category.thumbnail,
              `${category.slug}.${new Date().getTime()}`
            ]);
            res.send({message: `Added category named ${category.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a category id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/changecategorythumbnail', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.filename && req.body.base64Image && req.body.categoryid){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;

      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/images/${filename}`,rawData, {encoding: "base64"},(err)=>{

      })
      const sqlUpdate = `UPDATE category SET thumbnail=? WHERE id= ?`;
      db.query(sqlUpdate,[filename, req.body.categoryid]).then(result => {
        res.send({message: `Update avatar for song ${req.body.categoryname} successfully.`});
      }).catch(err =>{
        res.send({error: {message: String(err)}});
      })
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a file."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})

router.post('/addartist', async (req, res, next)=>{
  if(req.user && req.user.role === ROLE.ADMIN){
    if(req.body.artist){
      let sqlInsert = `INSERT INTO artist(title, thumbnail, slug) VALUES(?,?,?)`;

      try{
            let artist = req.body.artist;
            await db.query(sqlInsert,[
              artist.title,
              artist.thumbnail,
              `${artist.slug}.${new Date().getTime()}`
            ]);
            res.send({message: `Added artist named ${artist.title} successfully.`});

      }catch(err){
        res.send({error: {message: String(err)}});
      }
    }
    else{
      res.status(403).send({error: {message: "Bad Request. You must to provide a artist id."}});
    }
  }
  else{
    res.send({error:{message: "You not permit to perform this action."}});
  }
})
module.exports = router;
