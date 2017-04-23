// Provide app / web service & information requirement
const https = require('https');
const config = require('./config');
const {DBmodules} = require('./database');
const passport = require('passport');
const querystring = require('querystring');
const FacebookStrategy = require('passport-facebook').Strategy;

// definition here
class AuthService {
    init(app){
        // Initial passport Strategy
        app.use(passport.initialize());
        app.use(passport.session());

        // Facebook Strategy
        passport.use(new FacebookStrategy({
            clientID: config.auth.fb.clientID,
            clientSecret: config.auth.fb.clientSecret,
            profileFields: config.auth.fb.profileFields,
            callbackURL: config.auth.fb.callback
            },
            function(accessToken, refreshToken, profile,done){
                let userdata = profile;
                return done(null,userdata);
            }
        ));
        //serialize and deserialize
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            // And then here: attach user object to req!!
            done(null, user);
        });

        app.get('/login/facebook',this.loginfb);
        app.post('/auth/facebook',this.authfb);
        app.get('/auth/facebook/callback',passport.authenticate('facebook',{
            successReturnToOrRedirect: config.auth.fb.successUrl,
            failureRedirect: config.auth.fb.failureUrl
        }));
    }
    loginfb(req,res){
        // Login page - facebook
        res.render('login',{title:"Sign in with Facebook",type:"facebook",bgcolor:config.login.fb_bgcolor_Hex});
    }
    authfb(req,res){
        // Auth page - facebook
        console.log(req.body.username+";"+req.body.email);
        // Doing authentication
        if (!req.session) req.session = {};
        req.session.returnTo = config.auth.fb.successUrl;
        // Pass them to session
        passport.authenticate('facebook')(req, res, next);
    }
}

module.exports = {
    AuthService: new AuthService()
};
