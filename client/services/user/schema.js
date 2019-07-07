import Joi from 'joi-browser';

export const POST_USER_REGISTER = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required(),
  type: Joi.string().required()
};
export const POST_USER_LOGIN = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required()
};
export const PUT_USER = type => ({
  avatar: Joi.string(),
  company: type === 'boss' ? Joi.string().required() : Joi.string(),
  position: Joi.string().required(),
  salary: Joi.string(),
  desc: Joi.string()
});
