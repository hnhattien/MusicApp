var express = require('express');
var router = express.Router();
const requests = require('request-promise');
const db = require("../databases/DatabaseConnection")
const { connectDB } = require("../databases/DatabaseConnection")
const passport = require('../authenticate/PassportInit');
const bcrypt = require('bcrypt');
const authenFunctions = require('../authenticate/authenticate-functions');

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
  if (!db) connectDB();
  if (!db) {
    connectDB()
    console.log("Reconnect");
  }
  let catname = req.params.cat;
  let sqlSelectCat = `SELECT * FROM user`
  db.query()

})

//Authenticate

router.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
)

router.post("/signup",async (req, res, next)=>{
  let username = req.body.username;
  let password = req.body.password;
  let repeatpassword = req.body.repeatpassword;
  let email = req.body.email;
  let responsejson = {};
  await authenFunctions.isExistedUsername(username).then((result)=>{
    if(result === true){
      responsejson = {error: true,message: "Account existed",which: "username"};
     
      
    }
    else{
      authenFunctions.isExistedEmail(email).then((result)=>{
        if(result === true){
          responsejson = {error: true,message: "Account existed",which: "email"};
         
        
        }
        else{
          authenFunctions.isEqualPassword(password, repeatpassword).then(
            (result)=>{
              if(result === false) {
                responsejson = {error: true,message: "Two password not same."};  
              
                
              }
              else{
                //Add user
                let hashedPassword = bcrypt.hashSync(password,10);
                let sqlInsertUser = `INSERT INTO user(username,email,password) VALUES(:username,:email,:password)`;

                db.query(sqlInsertUser,{username: username, password: hashedPassword, email: email}).then(result=>{
                  responsejson = {};
                  responsejson['username'] = username;
                  responsejson['success'] = true;
                  
                  
                })
              }
          })
        }
      })
    }
  }).catch(err=>{
    let response = {};
    response['error'] = true;
    response['message'] = String(err);
  })
  
  res.send(responsejson);
  
  
  
  
  
})


module.exports = router;
