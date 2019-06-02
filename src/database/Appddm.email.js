var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tuser423442@gmail.com',
    pass: 'MyTuserAccont01!'
  }
});

var mailOptions = {
  from: 'tuser423442@gmail.com',
  to: 'daniel@mcnall.net',
  subject: 'Confirmation Email for Website',
  text: 'This email is to confirm your signup.'
}

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
