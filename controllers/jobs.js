var express = require('express'),
	router = express.Router(),
	Job = require('../models/job.js');

router.get('/index', function (req, res) {
	res.render('jobs/index');
	// res.render('posts/``new'); 
});

router.post('/new', function(request, response) {
  console.log("I AM GETTING SOME JOBS");
  console.log("It's session", request.session.currentUser);
	console.log(request.body);	
  var newJob = new Job(request.body); 
  newJob.userName = request.session.currentUser;
  newJob.save(function (err, jobObject) {
      if (err) {
        console.log(err);
        response.redirect(301, '/jobs/detail')
      } else {
        console.log("Saving ",jobObject);
        response.redirect(301, '/jobs/detail')
      }
  })
  console.log("THOSE WERE THE JOBS");
});

router.get('/detail', function (req, res) {

  console.log(req.session.currentUser, "detail");

  Job.find({
    userName: req.session.currentUser
  }, function (err, foundJobs) {
    if (err) {
      console.log(err);
    } else {      
      res.render('jobs/detail', {
        jobsObjects: foundJobs
      });
    };
  });
});

router.delete('/:id', function (req, res) {
  console.log(req.params.id);
  console.log("I am deleting");
  Job.remove({
    _id: req.params.id
  }, function (err) {
    if (err) {
      console.log("Delete Job err")
    } else {
      res.redirect(302, '/jobs/detail');
    };
  });
});

module.exports = router;