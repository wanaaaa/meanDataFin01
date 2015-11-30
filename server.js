var PORT = process.env.PORT || 3000,
  MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017";
  
var express     = require('express'),
	  expressLayouts  = require('express-ejs-layouts'),
    ejs = require('ejs'),
    session = require('express-session'),
    server      = express(),
    bodyParser  = require('body-parser'),
    methodOverride = require('method-override');



    // PORT		    = 3000,
    mongoose    = require('mongoose');
    // mongodb     = require('mongodb');
    // MongoClient = mongodb.MongoClient,
    // url = 'mongodb://localhost:27017/meanData';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'FinalProjectGeneral@gmail.com',
      pass: 'generalassembly'
  }
});


console.log("meanData Working");

server.use(express.static('./public'));
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(methodOverride('_method'));

server.use(expressLayouts);

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(session({
  secret: "Some passPharase to encript", 
  resave: true,
  saveUnintialized:  false
}));

var userController = require('./controllers/users.js');
server.use('/users', userController);
var jobController = require('./controllers/jobs.js');
server.use('/jobs', jobController);

server.get('/', function (req, res) {
  // res.render('jobs/detail');
  // res.render('users/new');
  res.redirect(301, '/users/new')
});

// server.get('/', function (req, res) {
//   // res.render('messages/');
//   res.redirect(301, '/messages')
// });



server.get('/send', function(req, res) {
  var mailOptions = {
    from: 'Final Project WDI <FinalProjectGeneral.com>', // sender address
    to: req.query.to, // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.text, // plaintext body
    html: req.query.text // html body
  };

  console.log("req",req.query);

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ');
  });
 
}); //End of server.get


mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors");
});

db.once('open', function () {
  console.log("Database up and running");
  server.listen(PORT, function () {
    console.log("server up and running");
  })
})

// mongoose.connect('mongodb://localhost:27017/meanData');

// server.listen(PORT, function(){
//   console.log("Server is listening");
// });
