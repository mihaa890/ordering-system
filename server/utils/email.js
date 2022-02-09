const nodemailer = require("nodemailer");
const Config = require('../services/config');
const utils  = require("./utils")

const config = Config.load()

const sendEmail = async (email, subject, options) => {
  try {
    const transporter = nodemailer.createTransport({
      service: config.email.service,
      port: 587,
      secure: true,
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    let mailOptions = {
      from: config.email.user,
      to: email,
      subject: subject,
      html: options
    };
    
    await transporter.sendMail(mailOptions);

    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};


module.exports = sendEmail;