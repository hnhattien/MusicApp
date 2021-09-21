
const db = require('../databases/DatabaseConnection');

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

const initPassport = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
      },
        function(username, password, done){
           
    
            db.query(`SELECT * FROM user WHERE username = ?`,[username]).then(result=>{
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
                console.log(err);
                return done(err);
            })
            
        }
      ))



      passport.serializeUser((user, done)=>{
        console.log("seeserialize")
        done(null, user.id);
      })
      
      passport.deserializeUser((id, done)=>{
        
        db.query(`SELECT id,avatar,displayedName, username, email FROM user WHERE id=?`,[id]).then((result)=>{
          
            if(result.length !== 0){
              done(null, result[0]);
            }
            else{
              done(err, false);
            }
        }).catch(err=>{
          console.log(err);
        })
      })


}  
module.exports = initPassport;