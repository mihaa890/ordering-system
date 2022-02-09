const { User, validate } = require('../models/userModel.js');
const sendEmail = require("../../utils/email");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Config = require("../../services/config");
const utils = require("../../utils/utils");

const config = Config.load();

exports.signup = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(409).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).send({
        message: "User with given email already exist!"
      }
      );

    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
      role : req.body.role,
    }).save();

    const email = req.body.email;

    const jwtToken = jwt.sign(
      { user_id: user._id, email },
      config.email.token_key,
      {
        expiresIn: "2h",
      }
    );

    user.token = jwtToken
    res.status(201).json(user);

    const url = `http://${config.email.base_url}:3001/api/verify/${jwtToken}`;

    const confirmEmailOptions = utils.renderConfirmEmailTemplate(url);

    await sendEmail(user.email, "Verify Email", confirmEmailOptions);

    res.send();

  } catch (error) {
    console.log(error)
  }
}

exports.verify = async (req, res) => {
  const { token } = req.params


  if (!token) {
    return res.status(422).send({
      message: "Missing Token"
    });
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      config.email.token_key
    );
  }
  catch (err) {
    return res.status(500).send(err);
  }

  try {
    const { user_id } = payload
    const user = await User.findOne({ _id: user_id }).exec();
    if (!user) {
      return res.status(404).send({
        message: "User does not exists"
      });
    }
    user.verified = true;
    await user.save();

    const path = `http://${config.email.base_url}:${config.email.port}/login`

    utils.renderVerifyEmailTemplate(res, path)

  } catch (err) {
    return res.status(500).send(err);
  }
}

exports.login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({
        message: "Email and password are required"
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User does not exists"
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        config.email.token_key,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      const role = user.role

      res.status(200).send({
        message: "Successful login",
        token, 
        role
      })
    }
    else {
      res.status(400).send({
        message: "Invalid Credentials"
      });
    }
  } catch (err) {
    console.log(err);
  }
}

exports.forgotPass = async (req, res) => {

  const { email } = req.body;

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        message: "User with given email does not exist."
      });
    }
    const token = jwt.sign(
      { user_id: user._id, email }, config.email.password_reset_key,
      {
        expiresIn: "2h",
      }
    );

    const url = `http://${config.email.base_url}:${config.email.port}/reset-password/${token}`;

    const forgotPasswordOptions = utils.renderForgotPassTemplate(url);

    await sendEmail(user.email, "Reset Password", forgotPasswordOptions);

    res.status(200).send({
      message: "Email sent"
    })

  }
  catch (err) {
    return res.status(500).send(err);
  }
}

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (token) {


    const payload = jwt.verify(token, config.email.password_reset_key);

    const user = await User.findOne({ _id: payload.user_id }).exec();
    if (!user) {
      res.status(404).send({
        message: "User does not exist"
      })
    }

    encryptedPassword = await bcrypt.hash(newPassword, 10);
    user.password = encryptedPassword
    await user.save()
    res.status(200).send({
      message: "Password changed"
    })

  }
  else {
    res.status(401).send({
      message: "Unauthorized"
    });
  }
}
exports.usersList = async function(req, res){

  User.find({}).then(function (users) {
    res.send(users);
    });

}
