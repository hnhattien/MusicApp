var express = require('express');
var router = express.Router();
let bcrypt = require("bcrypt");
const fs = require('fs');
let db = require("../databases/DatabaseConnection");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadavatar',(req, res, next)=>{
  
 
    if(req.user){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;
      console.log(base64);
      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/images/${filename}`,rawData, {encoding: "base64"},(err)=>{
        console.log("Save file succe",err);
      })
      const sqlUpdate = `UPDATE user SET avatar=?`;
      let response = {};
      db.query(sqlUpdate,[filename]).then(result => {
        if(result){
          console.log("Update success avatar",result);
        }
        response['message'] = "Update avatar successfull!";
      }).catch(err =>{
        response['error'] = {message: String(err)};
      }).then(() =>{
        res.send(response);
      })
    }
})

router.post('/changenickname',(req, res, next)=>{ 
   if(req.user){
    let newNickname = req.body.newNickname;
    const sqlUpdate = `UPDATE user SET displayedName=?`;
    let response = {};
    db.query(sqlUpdate,[newNickname]).then(result => {
      if(result){
        console.log("Update nickname success",result);
      }
      response['message'] = "Update nickname successfull!";
    }).catch(err =>{
      response['error'] = {message: String(err)};
    }).then(() =>{
      res.send(response);
    })
   }
})
router.get("/likedmusics",(req, res, next)=>{
  if(req.user){
      let sqlSelectLikedMusics = `SELECT m.id, m.title, m.artist_name, m.thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug from music m INNER JOIN artist a ON m.artist_id = a.id INNER JOIN liketable l ON l.songid= m.id WHERE l.userid=? ORDER BY l.id DESC`;
      db.query(sqlSelectLikedMusics,[req.user.id]).then(result => {
        let newResult = Array.from(result).map(music => {
          music['liked'] = true;
          return music;
        })
        res.send(newResult);
      }).catch(err => {
        res.send({error: {message: String(err)}});
      })
  }
  else{
    res.send({error: {message: "Not login yet."}})
  }
})
router.get("/:id",(req, res, next)=>{
  let id = req.params.id;
  console.log(req.user)
  if(req.user){
    if(Number(id)===Number(req.user.id)){
      let sqlSelect = `SELECT username, email FROM user WHERE id=?`;
      db.query(sqlSelect,[req.user.id]).then(result=>{
        console.log(result);
        res.send(result[0]);
      })
    }
    else{
      res.send({error:{message:"You cannot see user info who is not you."}});
    }
  }
  else{
    res.send({error: {message: "You have not authorized yet"}});
  }
})

router.post("/changepassword", (req, res) => {
  if(req.user){
    let sqlSelect = `SELECT password FROM user WHERE id=?`;
    db.query(sqlSelect, [req.user.id]).then(result=>{
      if(result[0]){
        if(bcrypt.compareSync(req.body.currentpassword,result[0]['password']) === true){
          let sqlUpdate = `UPDATE user SET password=? WHERE id=?`;
          let hasedNewpassword = bcrypt.hashSync(req.body.newpassword,10);
          db.query(sqlUpdate, [hasedNewpassword, req.user.id]).then(result=>{
            console.log(result);
            res.send({"message": "Update password successfull."});
          }).catch(err=>{
            res.send({error: {message: String(err)}});
          })      
        }
        else{
          res.send({error: {message: "Current password is not correct!"}});
        }
      }
      else{
        res.send({error: {message: "Cannot find out user "}})    
      }
    }).catch(err => {
      res.send({error: {message: String(err)}})    
    })
  }
  else{
    res.send({error: {message: "You not permit to perform this action."}})
  }
})


module.exports = router;
