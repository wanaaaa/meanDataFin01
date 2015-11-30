var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');

router.get('/', function (req, res) {
	res.render('users/new');
	// res.render('posts/``new'); 
});

router.post('/post', function (req, res) {
	var newUser = new User(req.body.user);
	console.log('*********************')
	console.log(req.body.user)
	newUser.save(function (err, userObject) {
		if (err) {
			console.log(err);
		} else {
			console.log("Saving user", userObject);
			res.redirect(301, '/users/new');
		}
	})
});

router.post('/login', function (req, res) {
	var currentUser = req.body.user;

	console.log(req.session);

	User.findOne({username: currentUser.username}, function (err, foundUser) {
		if (foundUser && foundUser.password === currentUser.password) {
			req.session.currentUser = foundUser.username;
			console.log(req.session.currentUser);
			console.log("User loggin")
			res.redirect(301, "/jobs/index");
		} else {
			res.redirect(301, '/users/new');
		}
	})
});

module.exports = router;