var zoho_password = require('./password.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function successEmail(userEmail, cb){

  console.log("Sending success email");
  var sender = '"Inventure Team" <eddie@meetinventure.com>';
  var recipient = userEmail;
  var subject = "Thank You For Contacting Inventure";
  var message =
  "<html><body>We have received your email and will be getting back to you shortly. In the meantime, follow us on Facebook and Instagram.</body></html>";

  let transporter = nodemailer.createTransport(smtpTransport({

    service:'Zoho',
       host: 'smtp.zoho.com',
       port:465,
       secure: true,
       auth: {
         user: 'eddie@meetinventure.com',
         pass: zoho_password()
       },
    // service: 'zoho',
    // secure: false,
    // port: 25,
    // auth: {
    //   user: 'watowebteam@gmail.com',
    //   pass: zoho_password()
    // },
    // tls: {
    //   rejectUnauthorized: false
    // }
    // service: 'Zoho',
    // host: 'smtp.zoho.com',
    // secure: false,
    // port: 587,
    // auth: {
    //   user: 'edde@meetinventure.com',
    //   pass: zoho_password()
    // },
    // requireTLS:false,
    // ignoreTLS:true,

  }));
  let HelperOptions = {
    from: sender,
    to: recipient,
    subject: subject,
    html: message

  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log("Unable to send mail!");
      // errorEmail("Error on application verification email"+"\n"+req.body.email);
      // res.redirect('/#/errorunknown');
      return console.log(error);
    } else {
      console.log("The message was sent!");
      cb();
    }
  });
}
