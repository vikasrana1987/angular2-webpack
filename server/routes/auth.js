exports.authenticate = function(app,jwt){
    return function(req, res) {	
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
	}
}

exports.users = function(req, res, next) {
	return res.status(200).send(JSON.stringify([
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
		{id: Math.floor(Math.random()*89999+10000),firstName:'Test',lastName:'user '+ Math.floor(Math.random()*89999+10000)},
	]));
}