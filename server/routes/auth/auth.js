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
              response['user'] = {id: user.id}
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
}
catch(err){
    response['error'] = {messgae: "Logout failded"};
}
res.send(response);
})

router.post("/signup",(req, res, next)=>{
    let username = req.body.username,
        email = req.body.email,
        password = req.body.password;
        console.log(req.body)
    let response = {};
    let hashedPassword = bcrypt.hashSync(password,10);
    let sqlInsertUser = `INSERT INTO user(username,email,password) VALUES(?,?,?)`;
    db.query(sqlInsertUser,[username, email, hashedPassword]).then((result=>{
        response['username'] = username;
        response['message'] = 'Sign up successful!';
    })).catch(err=>{
        if(err) response['error'] = {message: String(err)};
    }).then(()=>{
       
        res.send(response);
    })
    
})

//Authenticate
router.get("/loginstatus", (req, res, next)=>{
    let response = {};
    console.log(req.session)
      if(req.session.passport){
        response['user'] = {id:req.session.passport.user};
      }
      res.send(response);
      next();
  })
  

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

module.exports = router;
