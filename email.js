var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jishantales@gmail.com',
    pass: 'sjhs nqws uarj neda'
  }
});

var mailOptions = {
  from: 'jishantales@gmail.com',
  to: 'officialtashif@gmail.com',
  subject: 'Sending Email using Node.js',
  html: `<div style="background-color: beige; padding: 10px; text-align: center;">
        <h1>RESET PASSWORD</h1>
        <p>We at DRDC Computers have received the request to reset the email password. If this was not you, kindly ignore this email. </p>
        <button style="background-color:blueviolet; color: white; padding: 10px; cursor:pointer;">RESET PASSWORD</button>
    </div>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});