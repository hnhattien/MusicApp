
const db = require('../databases/DatabaseConnection');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();
const ROLE = require('./RoleData');
const initPassport = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true

      },
        function(req, username, password, done){

            if(req.body.isAdminLogin){
              db.query(`SELECT * FROM user WHERE username = ? AND role=?`,[username,ROLE.ADMIN]).then(result=>{
                console.log("Hihi",ROLE.ADMIN)
                  if(result.length === 0){
                      return done(null,false,{message: "Incorrect username."});
                  }
                  else{
                      bcrypt.compare(password, result[0]['password'],(err, res)=>{
                          if(err) return done(err);
                          if(res === false){ return done(null,false,{message: "Incorrect password."})}
                          return done(null, result[0], {message: "Login success"});
                      })

                  }
              }).catch(err=>{

                  return done(err);
              })
            }
            else{
              db.query(`SELECT * FROM user WHERE username = ? and role=?`,[username,ROLE.USER]).then(result=>{
                  if(result.length === 0){
                      return done(null,false,{message: "Incorrect username."});
                  }
                  else{
                      bcrypt.compare(password, result[0]['password'],(err, res)=>{
                          if(err) return done(err);
                          if(res === false){ return done(null,false,{message: "Incorrect password."})}
                          return done(null, result[0], {message: "Login success"});
                      })

                  }
              }).catch(err=>{

                  return done(err);
              })
            }

        }
      ))



      passport.serializeUser((user, done)=>{
        done(null, user.id);
      })

      passport.deserializeUser((id, done)=>{

        db.query(`SELECT id,avatar,displayedName, username, email, role FROM user WHERE id=?`,[id]).then((result)=>{

            if(result.length !== 0){
              done(null, result[0]);
            }
            else{
              done(err, false);
            }
        }).catch(err=>{

        })
      })


}
module.exports = initPassport;
