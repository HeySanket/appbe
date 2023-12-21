var nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const pass = process.env.PASS;
const mailSender = (email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "golesanket0@gmail.com",
      pass: pass,
    },
  });

  const a = `https://app.unozap.com/forgotPassword?gamil=${email}`;
  var mailOptions = {
    from: "golesanket0@gmail.com",
    to: email,
    subject: "Forgot Password",
    html: `<a href=${a}>forgot password</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent" + info.response);
    }
  });
};

module.exports = mailSender;
