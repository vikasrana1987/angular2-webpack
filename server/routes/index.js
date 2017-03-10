var _AUTH = require('./auth');
module.exports = function(app,router,jwt) {
	
	/* Auth */
	router.post('/authenticate', _AUTH.authenticate(app,jwt));
	/* End Auth */
	/* User */
    router.get('/users', _AUTH.getUsers);
	router.get('/users/:id', _AUTH.getUserById);
    /* End User */
	router.get('*', function(req, res, next) {
		res.render('app/index', { page_title: 'PEN_V4', user_data: {} });
	})
}