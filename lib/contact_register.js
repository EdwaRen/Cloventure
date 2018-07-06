var zoho_password = require('./password.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function contact_register(userEmail, cb){
  var sender = '"Inventure Team" <eddie@meetinventure.com>';
  var recipient = userEmail;
  var subject = "Thank You For Registering for Inventure";
  var message =
  "<html><body>Congratulations 🎉! We have received your registration for Inventure and are looking forwards to seeing you there. <br /> For more information, questions, or concerns feel free to contact hello@meetinventure.com.<br /><br /> Best,<br />Inventure 2018</body></html>";

  let transporter = nodemailer.createTransport(smtpTransport({

    service:'Zoho',
       host: 'smtp.zoho.com',
       port:465,
       secure: true,
       auth: {
         user: 'eddie@meetinventure.com',
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
      return console.log(error);
    } else {
      console.log("The message was sent!", userEmail);
      cb();
    }
  });
}
