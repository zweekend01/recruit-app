const Joi = require('@hapi/joi');
const { PHONE_REG } = require('../../config');

exports.register = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required(),
  tel: Joi.string().regex(PHONE_REG).required()
    .error((errors) => errors[0].type === 'string.regex.base' ? new Error('tel is invalid') : errors),
  address: Joi.string(),
  email: Joi.string().email()
};

exports.login = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required()
};
