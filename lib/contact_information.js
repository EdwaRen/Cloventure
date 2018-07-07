var zoho_password = require('./password.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function contact_information(userEmail, clientEmail, userName,userMessage, cb){

  console.log("Sending success email");
  var sender = '"Inventure Team" <eddie@meetinventure.com>';
  var recipient = userEmail;
  var subject = "New message from " + userName + " " + clientEmail;
  var message =
  "<html><body>" + userMessage + "</body></html>";

  let transporter = nodemailer.createTransport(smtpTransport({

    service:'Zoho',
       host: 'smtp.zoho.com',
       port:465,
       secure: true,
       auth: {
         user: 'hello@meetinventure.com',
         pass: zoho_password()
       },
  }));
  let HelperOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    html: message

  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log("Unable to send mail!", userEmail, error);
      // errorEmail("Error on application verification email"+"\n"+req.body.email);
      // res.redirect('/#/errorunknown');
      return console.log(error);
    } else {
      console.log("The message was sent!", userEmail);
      cb();
    }
  });
}
