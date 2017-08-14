var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
var multer = require('multer');
var multerAzure = require('multer-azure');
var upload = multer({
    storage: multerAzure({
        connectionString: 'DefaultEndpointsProtocol=https;AccountName=dataclubs;AccountKey=mVAway35IaB524vtrN5SdamkxuLl///LV4Xfd0/30JNG5Y6c0GfMyNazBYBWCG6idH1UPUcjVgU2fTdLdPSx6Q==;EndpointSuffix=core.windows.net',
        container: 'datasets'
    })
});
var passport = require('passport');
// we have to initialise passport.js before we can use it
// (see app.use(passport.initilize() below)
// then we pass it to our passport.js file to use in strategies
require('../config/passport')(passport);

var app = express();
var server = require('http').Server(app);
var config;
if(!process.env.MongoUsername) {
	config = require('../config/auth');
}

var mongoose = require('mongoose');
// use default JS promises as mongoose promises are deprecated
mongoose.Promise = global.Promise;
var options = {
	user: process.env.MongoUsername || config.mongo.username,
	pass: process.env.MongoPassword || config.mongo.password
};

// NOTE: Be careful which mongoose object to connect/assign models to.
// I was adding the models to the global mongoose object, but opening a 
// separate connection (mongoose.createConnection()) that the models
// are not part of. Since the model has no connection, save() doesn't work.
// https://stackoverflow.com/questions/10156623/mongoose-js-instance-save-callback-not-firing

// var db = mongoose.createConnection('ds038319.mlab.com:38319/dc', options);
mongoose.connect('mongodb://dcadmin:W1lk0m3nn!@ds038319.mlab.com:38319/dc', {
    useMongoClient: true
});
// note we don't need require for User because this has already been included in config/passport.js
require('../models/Club');
require('../models/Dataset');
require('../models/Organisation');
var User = mongoose.model('User');
var Club = mongoose.model('Club');
var Dataset = mongoose.model('Dataset');
var Organisation = mongoose.model('Organisation');

app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// don't expose external paths to resources, so to access node_modules
// for angular etc. use a /scripts alias for the path
app.use('/scripts', express.static(path.join(__dirname, '../node_modules')));
app.use(session({ 
	secret: 'dataclubs',
	resave: false,
	saveUninitialized: false 
}));
app.use(passport.initialize());
// remember to let passport access the session for req.isAuthenticated to work!
app.use(passport.session());


// middleware
// is user authenticated?
var isAuthenticated = function(req, res, next) {
	// if a user is authenticated, carry on
	// isAuthenticated provided by passport
	if (req.isAuthenticated()) {
		return next();
	}

	// not authenticated, redirect to home page to login
	res.writeHead(401, {
        'Location': '/#!/'
    });
    res.end();
};


// routes
app.post('/api/register', function(req, res) {
    var newUser = new User();

    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.organisation = req.body.organisation;
    newUser.setPassword(req.body.password);
    newUser.admin = false;

    newUser.save(function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.status(200).end();
    });
});

app.post('/api/login', passport.authenticate('local'), function(req, res) { 
    // this line of code is only hit if passport authenticates ok
    res.status(200).end();
});

app.get('/api/logout', function(req, res) { 
    // req.logout() provided by passport
	req.logout();
	res.status(200).end();
});

app.get('/api/me', isAuthenticated, function(req, res) {
    var user = {
        name: req.user.name,
        email: req.user.email,
        organisation: req.user.organisation,
        admin: req.user.admin
    };

    res.json(user);
});

app.post('/api/create/club', isAuthenticated, function(req, res) {
    var newClub = new Club();

    newClub.name = req.body.name;
    newClub.description = req.body.description;
    newClub.tags = req.body.tags;
    newClub.open = req.body.open;
    newClub.owner = req.user.email;

    newClub.save(function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        }
        res.status(200).end();
    });
});

app.post('/api/create/dataset/', isAuthenticated, upload.single('file'), function(req, res) {
    var newDataset = new Dataset();

    newDataset.name = req.body.name;
    newDataset.description = req.body.description;
    newDataset.tags = req.body.tags;
    newDataset.owner = req.user.email;
    newDataset.type = req.file.mimetype;
    newDataset.url = req.file.url;

    newDataset.save(function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        }

        res.status(200).end();
    });
});

app.post('/api/create/organisation/', isAuthenticated, upload.single('file'), function(req, res) {
    var newOrganisation = new Organisation();

    newOrganisation.name = req.body.name;
    newOrganisation.logoUrl = req.file.url;
    newOrganisation.type = req.body.type;

    newOrganisation.save(function(err) {
        if(err) {
            console.log(err);
            res.status(500).end();
        }

        // add organisation to club
        Club.update(
            { _id: req.body.clubId },
            { $push: { organisations: newOrganisation._id }
        }, function(err, result) {
            if(err) {
                res.status(500).end();
            }

            res.status(200).end();
        });
    });
});

app.post('/api/add/organisation', isAuthenticated, function(req, res) {
    // add organisation to club
    Club.update(
        { _id: req.body.clubId },
        { $push: { organisations: mongoose.Types.ObjectId(req.body.orgId) }
    }, function(err, result) {
        if(err) {
            res.status(500).end();
        }

        res.status(200).end();
    });
});

app.get('/api/me/clubs/', isAuthenticated, function(req, res) {
    if(req.user.admin) {
        // return all clubs
        Club.find({}, function(err, clubs) {
            if(err) {
                res.status(500).end();
            }

            res.json(clubs);
        });
    } else {
        // just the ones the user is an owner or member of
        Club.find({
            $or: [
                { "owner": req.user.email },
                { "members": { $elemMatch: { $eq: req.user.email } } }
        ]}, function(err, clubs) {
            if(err) {
                res.status(500).end();
            }

            res.json(clubs);
        });
    }
});

app.get('/api/club/:id/organisations', isAuthenticated, function(req, res) {
	Club.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) }},
        { $project: { _id: false, organisations: true }}],
    function(err, orgIds) {
        if(err) {
            res.status(500).end();
        }

        // now we have the member org ids, fetch the organisation objects
        Organisation.find({ _id: { $in: orgIds[0].organisations }}, function(err, orgs) {
            if(err) {
                res.status(500).end();
            }

            res.json(orgs);
        });
    });
});

app.get('/api/organisations/all', isAuthenticated, function(req, res) {
    Organisation.find({}, function(err, orgs) {
        if(err) {
            res.status(500).end();
        }

        res.json(orgs);
    });
});


// start app
server.listen(process.env.PORT || 3000, function() {
	if(process.env.port) {
		console.log('Listening on port ' + process.env.port);
	} else {
		console.log('Listening on port 3000');
	}
});