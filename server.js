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
    res.setHeader('Access-Control-Allow-Origin', 'http://meetinventure.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/api/mail', (req, res) => {
  console.log("connected: req", req)
  console.log("req data", req.body)
  console.log('req, specific data', req.body.email, req.body.email, req.body.name)
  contact_confirmation(req.body.email, function() {
    console.log("auto response to client succesfully sent");
  });

  contact_information("malindu@teaminventure.com", req.body.email, req.body.name, req.body.message, function() {
    console.log("mail succesfully sent to malindu");
    res.redirect('/');
  });

});

app.use(logger);
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, function() {
  console.log('server stared on port 3000')
});
