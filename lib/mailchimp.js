
module.exports = function mailchimpAddListCall(email, cb){
  var request = require('request')
  var add = require('./MCapikey.js');
  var errorEmail = require("./errorEmail.js");


  var subscriber = JSON.stringify({
    "email_address": email,
    "status": "subscribed"
  });

  request({
    method: 'POST',
    url: 'https://us18.api.mailchimp.com/3.0/lists/e8c220e236/members',
    body: subscriber,
    headers:
    {
      Authorization: 'apikey ' + add(),
      'Content-Type': 'application/json'
    }

  },
  function(error, response, body){
    if(error) {
      cb(err, null)
    } else {

      var bodyObj = JSON.parse(body);
      console.log(bodyObj.status);
      if(bodyObj.status === 400){
        // If email not showing up on mailchimp, remember to click 'next-page'
        // Ok so the mailchimp API does not have specific error codes, so right now I haven't thought of a way to differentiate email update failure or
        console.log("Bad response, email not updated to mailchimp");
        // return;
      } else if (bodyObj.status >= 500 && bodyObj.status < 600) {
        errorEmail("Mailchimp server failure", function() {

        });
      }
      cb(null, bodyObj.email_address +" added to list.");
    }
  });
}

// mailchimpAddListCall("eddiefytgesf.ren.2013@gmail.com", function(err) {
//
// });
