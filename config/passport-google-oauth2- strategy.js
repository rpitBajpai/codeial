const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/user');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({

        clientID: "813382933950-40vkojb8d2s7ej73hbe6peclm4db66bm.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
            // find a user
            User.findOne({email: profile.emails[0].value}).exec(function(err, user){
                if(err){
                    console.log('Error in google strategy-passport', err);
                    return;
                }

                console.log(profile);
                // if user found, this this user as req.user(sign in user)
                if(user){
                    return done(null, user);

                }else{
                    // if user not found, create the user and set it as req.user(sign in user)
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function(err, user){
                        if(err){
                            console.log('Error in creating user google strategy-passport', err);
                            return;
                        }
                        return done(null, user);
                    }
                    )
                }
                
            })
    }
))

module.exports = passport;