var express = require('express');
let router = express.Router();
const db = require("../../databases/DatabaseConnection")
const bcrypt = require('bcrypt');
let passport = require('passport');
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
              response['user'] = {id: user.id,nickname: user['displayedName'], avatar: user['avatar']}
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
const checkAccountExisted = async (username, email) => {
  let response = {};
  const sqlSelect = `SELECT username, email from user WHERE username=? OR email =?`;
  // const sqlSelectEmail = `SELECT id from user WHERE email=?`;
  response = await db.query(sqlSelect,[username,email]).then(result=>{
    if(result.length > 0){
      if(username === result[0]['username']){
        response['error'] = true;
        response['message'] = `Username has existed.`;
        return response;
      }
      else {
        response['error'] = true;
        response['message'] = `Signup isn't successfull. Has an account that have been registered by this email.`;
        return response;
      }
    }
    else{
      return response;
    }
    
  }).catch((err)=>{
    response['error'] = true;
    response.message = `Error Server: ${String(err)}`;
    return response;
  })

  return response;
}
router.post("/signup",async (req, res, next)=>{
    let username = req.body.username,
        email = req.body.email,
        password = req.body.password;
       
    let response = {};
    let hashedPassword = bcrypt.hashSync(password,10);
    let sqlInsertUser = `INSERT INTO user(username,email,password) VALUES(?,?,?)`;
    let checkExistAccountResponse = await checkAccountExisted(username,email);
    console.log(checkExistAccountResponse);
    if(checkExistAccountResponse.error){
      res.send(checkExistAccountResponse);
    }
    else{
      db.query(sqlInsertUser,[username, email, hashedPassword]).then((result=>{
          response['username'] = username;
          response['message'] = 'Sign up successful!';
      })).catch(err=>{
          if(err) response['error'] = {message: String(err)};
      }).then(()=>{
          res.send(response);
      })
    }
    
    
})

//Authenticate

  

// router.post("/signup",async (req, res, next)=>{
//     let username = req.body.username;
//     let password = req.body.password;
//     let repeatpassword = req.body.repeatpassword;
//     let email = req.body.email;
//     let responsejson = {};
//     await authenFunctions.isExistedUsername(username).then((result)=>{
//       if(result === true){
//         responsejson = {error: true,message: "Account existed",which: "username"};
//         res.send(responsejson);
        
//       }
//       else{
//         authenFunctions.isExistedEmail(email).then((result)=>{
//           if(result === true){
//             responsejson = {error: true,message: "Account existed",which: "email"};
//             res.send(responsejson);
          
//           }
//           else{
//             authenFunctions.isEqualPassword(password, repeatpassword).then(
//               (result)=>{
//                 if(result === false) {
//                   responsejson = {error: true,message: "Two password not same."};  
//                   res.send(responsejson);
                  
//                 }
//                 else{
//                   //Add user
//                   let hashedPassword = bcrypt.hashSync(password,10);
//                   let sqlInsertUser = `INSERT INTO user(username,email,password) VALUES(?,?,?)`;
  
//                   db.query(sqlInsertUser,[username, email, hashedPassword]).then(result=>{
//                     responsejson = {};
//                     responsejson['username'] = username;
//                     responsejson['success'] = true;
//                     res.send(responsejson);              
//                   })
//                 }
//             })
//           }
//         })
//       }
//     }).catch(err=>{
//       responsejson['error'] = true;
//       responsejson['message'] = String(err);
//       res.send(responsejson);
//     })
  
//   })

router.get('/loginstatus', (req, res, next)=>{
  let response = {};
  console.log("Kei",req.user);
  console.log("Kei1", req.session.passport);
  let user = req.user;
    if(user){
      response['isLogin'] = true;
      response['nickname'] = user.displayedName;
      response['avatar'] = user.avatar;
      response['id'] = user.id;
    }
    else response['isLogin'] = false;
    res.send(response);
})
module.exports = router;
