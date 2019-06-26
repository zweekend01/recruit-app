const crypto = require('crypto');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { UserModel } = require('../models');
const { PWD_SECRET, JWT_SECRET } = require('../config');
const {
  ERROR_USER_EXISTED,
  ERROR_USER_NOT_EXISTED,
  ERROR_USER_PWD_INCORRECT
} = require('../config/error');

class UserController {
  static register(req, res, next) {
    let { name, password, tel, address, email } = req.body;

    // 检测参数的有效性

    // 查询用户名是否已存在
    const userModel = new UserModel(req.app.get('mysql'));
    userModel.selectByName(name, (err, results) => {
      if (err) return next(createError(500));
      if (results[0] && results[0].id) return res.restError(ERROR_USER_EXISTED, next);

      // 将密码加密
      const hmac = crypto.createHmac('sha256', PWD_SECRET);
      hmac.update(password);
      password = hmac.digest('hex');

      // 插入一条用户记录
      userModel.insert({ name, password, tel, address, email }, (err, results) => {
        if (err) return next(createError(500));

        // 计算 token
        const payload = {
          exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
          uid: results.insertId
        };
        const token = jwt.sign(payload, JWT_SECRET);

        // 将 token 放在 Authorization 响应头中
        res.set('Authorization', 'Bearer ' + token);
        delete results[0].password
        res.restData({ ...results[0] }, 'Register success');
      });
    });
  }

  static login(req, res, next) {
    let { name, password } = req.body;

    // 检测参数的有效性

    // 查询用户是否存在
    const userModel = new UserModel(req.app.get('mysql'));
    userModel.selectByName(name, (err, results) => {
      if (err) {
        return next(createError(500))
      };
      if (!results[0]) return res.restError(ERROR_USER_NOT_EXISTED, next);

      // 检测密码是否正确
      const hmac = crypto.createHmac('sha256', PWD_SECRET);
      hmac.update(password);
      password = hmac.digest('hex');

      if (password !== results[0].password) return res.restError(ERROR_USER_PWD_INCORRECT, next);

      delete results[0].password
      res.restData({ ...results[0] }, 'Login success');
    });
  }

  static logout(req, res, next) {

  }
}

module.exports = UserController;
