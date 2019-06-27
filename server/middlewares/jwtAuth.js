const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const {
  ERROR_USER_LOGON_NOT_ACTIVE,
  ERROR_USER_LOGON_EXPIRES,
  ERROR_USER_TOKEN_INVALID
} = require('../config/error');
const { UserModel } = require('../models');

module.exports = function({ secret }) {
  let unlessPath = [];

  const handler = function(req, res, next) {
    // 过滤掉不需要token验证的请求
    if (unlessPath.some(item => item.test(req.path))) return next();

    // 获取token
    const token = req.get('Authorization');

    // token不存在
    if (!token) return next(createError(401));

    try {
      // options
      // algorithms、audience、complete、issuer、ignoreExpiration
      // ignoreNotBefore、subject、clockTolerance、maxAge、clockTimestamp、nonce
      const { exp, uid } = jwt.verify(token.slice(7), secret);

      // 检测是否需要刷新token
      const cur = +new Date();
      const remaining = exp - cur / 1000;
      const wait = 5 * 24 * 60 * 60;
      if (remaining < wait) {
        const refreshToken = jwt.sign({ uid, exp: cur / 1000 + 30 * 24 * 60 * 60 }, secret);
        res.set('Authorization', 'Bearer ' + refreshToken);
      };

      // 从数据库查询出用户的信息
      const userModel = new UserModel(req.app.get('mysql'));
      userModel.selectById(uid, (err, results) => {
        if (err) return createError(500);
        req.user = results[0];
        next()
      });
    } catch (err) {
      // token存在，但验证不正确
      let error;
      switch (err.name) {
        case 'NotBeforeError':
          error = ERROR_USER_LOGON_NOT_ACTIVE;
          break
        case 'TokenExpiredError':
          error = ERROR_USER_LOGON_EXPIRES;
          break
        default:
          error = ERROR_USER_TOKEN_INVALID;
      }
      if (error) return res.restError(error, next);
    }
  };

  handler.unless = function({ path }) {
    unlessPath = path;
    return this;
  };

  return handler;
};
