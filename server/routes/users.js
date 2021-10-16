var express = require('express');
var router = express.Router();
let bcrypt = require("bcrypt");
let crypto = require('crypto');
const fs = require('fs');
const ROLE = require('../authenticate/RoleData.js');
require('dotenv').config();
const nodemailer = require("nodemailer");
let db = require("../databases/DatabaseConnection");
/* GET users listing. */
router.get('/', function(req, res, next) {

  if(req.user && req.user.role === ROLE.ADMIN){
    let sqlSelect = `SELECT id,displayedName, email, username, joinday, role FROM user WHERE role=?`;
    db.query(sqlSelect,[ROLE.USER]).then(resultUser=>{
      res.send(resultUser);
    }).catch((err)=>{
      res.send({error: {message: String(err)}});
    })
  }
  else{
    res.send({error: {message: "Yout not permit to see user infomation. Please login as admin."}})
  }
});

router.post('/uploadavatar',(req, res, next)=>{


    if(req.user){
      let base64 = req.body.base64Image;
      let filename = req.body.filename;

      let rawData = base64.split(";base64,").pop();
      fs.writeFile(`public/upload/images/${filename}`,rawData, {encoding: "base64"},(err)=>{

      })
      const sqlUpdate = `UPDATE user SET avatar=?`;
      let response = {};
      db.query(sqlUpdate,[filename]).then(result => {
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
    let userId = req.user.id;
      let sqlSelectLikedMusics = `SELECT m.id,l.id as like_id, m.title, m.artist_name, m.thumbnail as music_thumbnail, m.audio, m.slug as music_slug, a.slug as artist_slug from music m INNER JOIN artist a ON m.artist_id = a.id INNER JOIN liketable l ON l.songid= m.id WHERE l.userid=? UNION SELECT m.id, l.id as like_id, m.title, m.artist_name, m.thumbnail as music_thumbnail, m.audio, m.slug as music_slug, m.artist_id as artist_slug from music m INNER JOIN liketable l ON l.songid= m.id  WHERE m.artist_id IS NULL AND l.userid =? ORDER BY like_id DESC`;
      db.query(sqlSelectLikedMusics,[userId, userId]).then(result => {
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

router.post("/changepassword", async (req, res) => {
  if(req.body.selector){ //For reset for forget password
      let selector = req.body.selector
      let resultEmail;
      try{
        resultEmail = await db.query("SELECT useremail FROM resetpassword WHERE selector = ?",[selector]);
        if(resultEmail.length <= 0){
            res.send({error: {message: "Something error!"}});
        }
        else{
          let userPassword = req.body.password;
          let hashedPassword = bcrypt.hashSync(userPassword,10);
          let sqlUpdate = `UPDATE user SET password=? WHERE email=? AND password IS NOT NULL`;
          db.query(sqlUpdate, [hashedPassword, resultEmail[0]['useremail']]).then(result=>{
            res.send({"message": "Update password successfull."});
          }).catch(err=>{
            res.send({error: {message: String(err)}});
          }).then(()=>{
            let sqlDelete = "DELETE FROM resetpassword WHERE selector = ? OR expires < ?";
            db.query(sqlDelete,[selector,new Date().valueOf()]).catch(err=>{
              res.send({error: {message: String(err)}});
            });
          })
        }

      }catch(err){
         res.send({error: {message: String(err)}});
      }


  }
  else if(req.user){
    let sqlSelect = `SELECT password FROM user WHERE id=?`;
    db.query(sqlSelect, [req.user.id]).then(result=>{
      if(result[0]){
        if(bcrypt.compareSync(req.body.currentpassword,result[0]['password']) === true){
          let sqlUpdate = `UPDATE user SET password=? WHERE id=?`;
          let hasedNewpassword = bcrypt.hashSync(req.body.newpassword,10);
          db.query(sqlUpdate, [hasedNewpassword, req.user.id]).then(result=>{

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


router.post("/resetpassword",(req, res, next)=>{
  let username = req.body.username;
  let sql = `SELECT email FROM user WHERE (username=? OR email=?) AND password IS NOT NULL`;
  db.query(sql,[username,username]).then((result)=>{
      if(result.length === 0){
        res.send({error: {message: "No any user with username or email you provide."}});
      }
      else{
        let userEmail = result[0]['email'];
        let token = crypto.randomBytes(20).toString("hex");
        let selector = crypto.randomBytes(9).toString("hex");
        let expires = new Date().valueOf() + 600000;
        let sqlInsert = `INSERT resetpassword(selector,useremail,token,expires)VALUES(?,?,?,?)`;
        let hashToken = bcrypt.hashSync(token,10);
        db.query(sqlInsert,[selector,userEmail,hashToken,expires]).then(async (result)=>{
          let testAcc = await nodemailer.createTestAccount();
          let transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth: {
              user: "artificialintelligence0105@gmail.com",
              pass: process.env.PASSGMAIL
            }

          });

          try{
            let infoEmail = await transporter.sendMail({
              from: "Sunwarder <artificialintelligence0105@gmail.com>",
              to: userEmail,
              subject: "Reset Password",
              html: `<h1>Reset Password For SE447-E Music App</h1>`+
              `<h1><a href='http://${req.hostname}:3000/resetpassword?sel=${selector}&token=${token}'>Click here to reset password.</a></h1>`
            })

            res.send({message: "Check email for reset password."});
          }
          catch(err){
            res.send({error: {message: String(err)}});
          }


        }).catch(err=>{
          res.send({error: {message: String(err)}});
        })

      }
  }).catch(err=>{
    res.send({error: {message: String(err)}});
  })
})

router.post("/authresetpassword",(req, res, next)=>{
  let sel = req.body.sel;
  let userToken = req.body.token;
  let hexRegex = /^[0-9a-fA-F]+$/;
  if(hexRegex.test(sel) && hexRegex.test(userToken)){
    let sqlSelect = `SELECT * FROM resetpassword WHERE selector=? AND expires > ?`;
    db.query(sqlSelect,[sel, new Date().valueOf()]).then(result=>{
      if(result.length === 0){
        res.send({error: {message: "Token was expires!"}});
      }
      else{

        let hashedUserToken = result[0]['token'];

        if(bcrypt.compareSync(userToken,hashedUserToken)){
          res.send({isAuth: true,message: "Request Reset password success!"});
        }
        else{
          res.send({error: {message: "Token is invalid."}});
        }
      }
    }).catch((err)=>{
      res.send({error:{message: String(err)}});
    })

  }
  else{

    res.send({error:{message: "Token is invalid!"}});
  }
})
module.exports = router;
