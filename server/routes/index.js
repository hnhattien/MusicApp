var express = require('express');
var router = express.Router();












/* GET home page. */
router.get('/index', async function (req, res, next) {

  let sqlSelectCoreMusic = `SELECT m.title, m.artist_name, m.thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug FROM music m INNER JOIN artist a oN m.artist_id = a.id`;
  let sqlSelectUserMusic = `SELECT title, artist_name, audio, thumbnail,slug as music_slug FROM music WHERE artist_id IS NULL`;
  let response = {}

  try {
    let resultMusics = await db.query(sqlSelectCoreMusic);
    if (resultMusics.length !== 0) {
      response['musics'] = resultMusics;
    }
    else {
      response['musics'] = [];
    }
    
  } catch (err) {
    console.log(err)
  }

  try {
    let resultUserMusics = await db.query(sqlSelectUserMusic);
    if (resultUserMusics.length !== 0) {
      response['usermusics'] = resultUserMusics;
    }
    else {
      response['usermusics'] = [];
    }

  } catch (err) {
    console.log(err)
  }

  res.send(response);
});

// GET Category

router.get("/category/:cat", (req, res, next) => {
  
 
  let catname = req.params.cat;
  let sqlSelectCat = `SELECT * FROM user`
  db.query()

})




module.exports = router;
