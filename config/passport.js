var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 

        User.findOne({ 'local.email' :  email.toLowerCase() }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); 

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password!')); 

            return done(null, user);
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {

        process.nextTick(function() {

        User.findOne({ 'local.email' :  email.toLowerCase() }, function(err, user) {
            if (err)
                return done(err);

            if(!req.body.firstName || !req.body.lastName){
                return done(null, false, req.flash('signupMessage', 'Please enter your name correctly! Try Again!'));
            }

            if(!ValidateEmail(email)){
                return done(null, false, req.flash('signupMessage', 'Please enter your email correctly! Try Again!'));
            }

            if(password.length < 6){
                return done(null, false, req.flash('signupMessage', 'Your password needs to be at least 6 characters! Try Again!'));
            }

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken. Try Again!'));
            } 

            else {
                var newUser = new User();
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.email    = email.toLowerCase();
                newUser.local.password = User.generateHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));


    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ["emails", "displayName"]

    },

    function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, user); 
                } else {
                    var newUser = new User();

                    newUser.facebook.id    = profile.id;            
                    newUser.facebook.token = token; 
                    newUser.facebook.name  = profile.displayName;
                    newUser.facebook.email = profile.emails[0].value; 

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));

};

function ValidateEmail(email)   
{  
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    if(email.match(mailformat)){
        return true;
    }
    else{
        return false;
    }
}  








