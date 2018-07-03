var express = require('express');
var app = express();
var path = require('path');
var contact_confirmation = require('./lib/contact_confirmation.js');
var contact_information = require('./lib/contact_information.js');


const bodyParser = require('body-parser');
// const url = 'mongodb://159.203.42.253:27017'
var router = express.Router();

// var cors = require('cors')
// var whitelist = ['https://meetinventure.com/', 'http://meetinventure.com/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log("origin", origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
var app = express()



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var logger = function(req, res, next) {
  next();
}


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    // check if verification token is correct
    // if (req.query.token !== token) {
    //     return res.sendStatus(401);
    // }

    // print request body
    console.log("req", req.body)
    console.log("req", req.body.form_response)
    console.log("req 1", req.body.form_response.answers[1])
    console.log("req 1 email", req.body.form_response.answers[1].email)

    console.log("req query", req.query);

    // return a text response
    const data = {
        responses: [
            {
                type: 'text',
                elements: ['Hi', 'Hello']
            }
        ]
    };

    res.json(data);
});



app.get('/api/mail', (req, res) => {
  var host = req.headers.host;
  var origin = req.headers.origin
  // console.log("req", req)
  console.log("req data", req.headers.host, req.headers.origin)

  // if (host == "https://meetinventure.com/") {
  //   console.log("not meetinventure")
  //   res.redirect('https://meetinventure.com/yikes.html');
  // }
  //
  // res.header("Access-Control-Allow-Origin", "https://meetinventure.com/");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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


// app.use(allowCrossDomain);


app.listen(3000, function() {
  console.log('server stared on port 3000')
});
