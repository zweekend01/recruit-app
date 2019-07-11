const Joi = require('@hapi/joi');
// const { PHONE_REG } = require('../../config');

exports.postUserRegister = () => ({
  name: Joi.string().required(),
  password: Joi.string().length(6).required(),
  type: Joi.string().required()
  // tel: Joi.string().regex(PHONE_REG).required()
  //   .error((errors) => errors[0].type === 'string.regex.base' ? new Error('tel is invalid') : errors),
  // address: Joi.string(),
  // email: Joi.string().email()
});
exports.postUserLogin = () => ({
  name: Joi.string().required(),
  password: Joi.string().length(6).required()
});
exports.putUser = ({ type }) => ({
  company: type === 'boss' ? Joi.string().require() : Joi.string(),
  position: Joi.string().require(),
  avatar: Joi.string(),
  salary: Joi.string(),
  desc: Joi.string()
});
