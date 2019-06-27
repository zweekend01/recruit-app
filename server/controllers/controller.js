const Joi = require('@hapi/joi');

class Controller {
  /**
   * 校验请求参数
   * @param {*} schema
   */
  static validate(schema) {
    return function (req, res, next) {
      const value = { ...req.query, ...req.body };
      Joi.validate(value, schema, (error, value) => {
        if (error) {
          let msg = error.details ? error.details[0].message : error.message;
          msg = msg.replace(/"/g, '');
          const data = { code: 'request:param is invalid', data: null, msg };
          return res.restError(data, next);
        }

        req.validated = value;
        next();
      })
    };
  }
}

module.exports = Controller;
