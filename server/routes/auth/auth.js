var express = require('express');
let router = express.Router();
const db = require("../../databases/DatabaseConnection")
const bcrypt = require('bcrypt');
let passport = require('passport');
const crypto = require('crypto');
const ROLE = require('../../authenticate/RoleData.js');
const fs = require('fs');
const {pushNotification} = require('../extra-feature.js');
router.post('/login',(req,res, next)=>{

    passport.authenticate('local',{failureFlash: true}, (err, user, info) => {
      let response = {};
      console.log("authenticated");
      if(err) {

        response['error'] = {message: String(err)};
        res.send(response);
      }
      else if(!user){
        response['error'] = {message: info['message']}
        res.send(response);
      }
      else{
        req.logIn(user, err=>{
          if(err) {res.send({error: {message: String(err)}})}
          else{
            let response = {};
            console.log(user);
            response['user'] = {id: user.id,nickname: user['displayedName'], avatar: user['avatar'], role: user['role']}
            response['message'] = info['message'];
            res.send(response);
          }
        })

      }

    })(req, res, next)
})

router.post("/logout",(req, res, next)=>{
let response = {};
try{
  req.logOut();
  response = {message: "Logout success"}
}
catch(err){
  response['error'] = {messgae: "Logout failded"};
}
res.send(response);
})
const checkAccountExisted = async (username, email, role) => {
  let response = {};
  const sqlSelect = `SELECT username, email from user WHERE (username=? OR email =?) AND role = ?`;
  // const sqlSelectEmail = `SELECT id from user WHERE email=?`;
  response = await db.query(sqlSelect,[username,email,role]).then(result=>{
    if(result.length > 0){
      if(username === result[0]['username']){
        return {error: {message: "Username has existed."}};
      }
      else {
        return {error: {message: "Signup isn't successfull. Has an account that have been registered by this email."}};
      }
    }
    else{
      return {ok: true};
    }

  }).catch((err)=>{
    return {error: {message: String(err)}};
  })

  return response;
}
router.post("/signup",async (req, res, next)=>{
    let username = req.body.username,
        email = req.body.email,
        password = req.body.password;
    let response = {};
    let hashedPassword = bcrypt.hashSync(password,10);
    if(req.body.isAdminSignup){
      let sqlInsertAdmin = `INSERT INTO user(username,email,password,role) VALUES(?,?,?,?)`;
      let checkExistAccountResponse = await checkAccountExisted(username,email,ROLE.ADMIN);
      if(checkExistAccountResponse.error){
        res.send(checkExistAccountResponse);
      }
      else{
        db.query(sqlInsertAdmin,[username, email, hashedPassword,ROLE.ADMIN]).then((result=>{
            response['username'] = username;
            response['message'] = 'Sign up successful!';
            const notify = {
              title: "Một adminstrator mới vừa đăng ký tài khoản.",
              type: "user",
              thumbnail: "defaultavatar.png",
              iconclasses: "fas fa-user-plus"
            };
            pushNotification(notify);

        })).catch(err=>{
          response['error'] = {message: String(err)};
        }).then(()=>{
            res.send(response);
        })
      }
    }
    else{
      let sqlInsertUser = `INSERT INTO user(username,email,password) VALUES(?,?,?)`;
      let checkExistAccountResponse = await checkAccountExisted(username,email,ROLE.USER);
      console.log(checkExistAccountResponse);
      if(checkExistAccountResponse.error){
        res.send(checkExistAccountResponse);
      }
      else{
        db.query(sqlInsertUser,[username, email, hashedPassword]).then((result=>{
            response['username'] = username;
            response['message'] = 'Sign up successful!';
            const notify = {
              title: "Một người dùng mới vừa đăng ký tài khoản.",
              type: "user",
              thumbnail: "defaultavatar.png",
              iconclasses: "fas fa-user-plus"
            };
            pushNotification(notify);
        })).catch(err=>{
          response['error'] = {message: String(err)};
        }).then(()=>{
            res.send(response);
        })
      }
    }


})

//Authenticate

router.post('/facebook',(req, res,next)=>{
  if(req.body.user){
    let id = req.body.user.userid;
    let username = req.body.user.email;
    let email = req.body.user.email;
    let displayedName = req.body.user.name;
    let avatarBase64 = req.body.user.avatarBase64;
    let rawData = avatarBase64.split(";base64,").pop();
    const avatarFilename = crypto.randomBytes(12).toString("hex") + new Date().valueOf()+".jpg";
    fs.writeFile(`public/upload/images/${avatarFilename}`,rawData, {encoding: "base64"},(err)=>{
      if(err){
        res.send({error: {message:"Error write file image!"}})
      }
    });
     db.query("SELECT id,avatar,displayedName, username, email FROM user WHERE id=?",[id]).then(resultUser=>{
       if(resultUser.length === 0){
         let sqlInsert = "INSERT INTO user(id,displayedName, avatar,username,email)VALUES(?,?,?,?,?)";
         db.query(sqlInsert,
         [id,displayedName,avatarFilename,email,email]).then(()=>{
           const notify = {
             title: "Một người dùng mới vừa đăng ký tài khoản.",
             type: "user",
             thumbnail: "defaultavatar.png"
           };
           pushNotification(notify);
            const user = {id,avatar: avatarFilename,displayedName, username, email};
            req.logIn(user,err=>{
              if(err) res.send({error: {message: String(err)}});
              else{
                res.send(user);
              }
            });
         }).catch(err=>{
           res.send({error:{message: String(err)}});
         })
       }
       else{
          req.logIn(resultUser[0],err=>{
            if(err) res.send({error: {message: String(err)}});
            else{
              res.send(resultUser[0]);
            }
          });
       }
     })
  }
  else{
    res.send({error:{ message: "Request login with Facebook failed!"}})
  }
});

router.get('/loginstatus', (req, res, next)=>{
  let response = {};

  let user = req.user;
    if(user && user.role === ROLE.USER){
      response['isLogin'] = true;
      response['nickname'] = user.displayedName;
      response['avatar'] = user.avatar;
      response['id'] = user.id;
      response['role'] = user.role;
    }
    else response['isLogin'] = false;
    res.send(response);
})

router.get('/adminloginstatus', (req, res, next)=>{
  let response = {};

  let user = req.user;
    if(user && user.role === ROLE.ADMIN){
      response['isLogin'] = true;
      response['nickname'] = user.displayedName;
      response['avatar'] = user.avatar;
      response['id'] = user.id;
      response['role'] = user.role;
    }
    else response['isLogin'] = false;
    res.send(response);
})



module.exports = router;
