import Joi from 'joi-browser';

export default {
  postUserRegister() {
    return {
      name: Joi.string().required(),
      password: Joi.string().length(6).required(),
      type: Joi.string().required()
    };
  },
  postUserLogin() {
    return {
      name: Joi.string().required(),
      password: Joi.string().length(6).required()
    };
  },
  putUser(type) {
    return {
      company: type === 'boss' ? Joi.string().required() : Joi.string(),
      position: Joi.string().required(),
      avatar: Joi.string(),
      salary: Joi.string(),
      desc: Joi.string()
    };
  }
};
