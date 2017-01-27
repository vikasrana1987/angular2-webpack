// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./server/config'); // get our config file
var cors = require('cors');
app.set('superSecret', config.secret); // secret variable

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090;        // set our port

var ignoreJWTRoutes = ['authenticate'];

var whitelist = ['http://localhost:8080' ]
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    var parts = req.path.split('/');
	currentPath = parts[parts.length-1];
	
	if(ignoreJWTRoutes.indexOf(currentPath) === -1 && req.method.toLowerCase() != 'options')
	{
		// check header or url parameters or post parameters for token
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			token  = req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			token =  req.query.token;
		} else {
			token = req.body.token || req.query.token || req.headers['x-access-token'];
		}
		// decode token
		if (token && typeof token != undefined) {
			// verifies secret and checks exp
			jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
				if (err) {
					return res.json({ 
						'success': false,
						'error-message':'Unclassified Authentication Failure',
						'error-auxiliary':'Access token is invalid. Please try with new Access token'
					});   
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});
		} else {
			// if there is no token
			// return an error
			return res.status(403).send({ 
				'success': false, 
				'error-message':'Unclassified Authentication Failure',
				'error-auxiliary':'Missing authorization token. Please try with valid Access token.'
			});
		}
	}
	else
	{
		// Pass to next layer of middleware
		next();
	}
});
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/authenticate', function(req, res) {
	var user = {id:1,username:'vikas'};
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

		// check if password matches
		if (user.password != req.body.password) {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		} else {
			var user = {id:1,username:req.body.username,password:req.body.password};
			// if user is found and password is right
			// create a token
			var token = jwt.sign(user, app.get('superSecret'), {
			  expiresIn: 1440 // expires in 24 hours
			});
			
			// return the information including token as JSON
			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		}   

    }
});

router.get('/users', function(req, res) {
	
	return res.status(200).send(JSON.stringify([
		{id:Math.random(),firstName:'Vikas',lastName:'Rane'},
		{id:Math.random(),firstName:'Test',lastName:'user'}
	]));
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);