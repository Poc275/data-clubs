var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('../models/User');
var User = mongoose.model('User');


module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		// subsequent requests can use req.user to use the user object
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done) {
		User.findOne({
			'email': email
		}, function(err, user) {
			if(err) {
				return done(err);
			}

			if(!user) {
				return done(null, false, {
                    message: 'Incorrect credentials'
                });
            }
            
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect credentials'
                });
            }

            // all credentials correct
            return done(null, user);
		 });
	}));
};