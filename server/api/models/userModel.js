const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const roles = { values: ['customer', 'admin'] }

const userSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password : {
      type: String,
      required: true
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token : {
      type:String,
      default : false
  },
  role: {
    type: String,
    enum: roles,
    trim : true, 
    required : true
},
});

const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(255).required(),
    role: Joi.string().min(4).max(255).required()
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};
