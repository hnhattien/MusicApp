const LocalStrategy = require("passport-local").Strategy;
const passport =require('passport');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function(username, password, done){
        User.findOne({username: username}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null,false,{message: 'Incorrect username'});
            if(!user.validPassword(password)){
                return done(null, false, { message: 'Password Incorrect'})
            }
            return done(null, user);
        })
    }
))

module.exports = passport;