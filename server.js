var express = require('express');
var app = express();
var path = require('path');
var contact_confirmation = require('./lib/contact_confirmation.js');
var contact_information = require('./lib/contact_information.js');


const bodyParser = require('body-parser');
// const url = 'mongodb://159.203.42.253:27017'
var router = express.Router();

var logger = function(req, res, next) {
  next();
}
app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://meetinventure.com');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/api/mail', (req, res) => {
  var host = req.headers.host;
  var origin = req.headers.origin
  console.log("req", req)
  console.log("req data", req.headers.host, req.headers.origin)

  if (host != "https://meetinventure.com/") {
    res.redirect('https://meetinventure.com/yikes.html');
  }
  //
  // res.header("Access-Control-Allow-Origin", "https://meetinventure.com/");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  console.log("connected: req", req)
  console.log("req query", req.query)
  console.log('req, specific data', req.query.email, req.query.email, req.query.name)
  contact_confirmation(req.query.email, function() {
    console.log("auto response to client succesfully sent");
  });

  contact_information("malindu@meetinventure.com", req.query.email, req.query.name, req.query.message, function() {
    console.log("mail succesfully sent to malindu");
    res.redirect('https://meetinventure.com/contact.html');
  });

});

app.use(logger);
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, function() {
  console.log('server stared on port 3000')
});
