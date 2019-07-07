const express = require('express');
const router = express.Router();

const userSchema = require('./schema');
const { UserController } = require('../../controllers');
const USER_BASE = '/v1/user';

router.post(
  `${USER_BASE}/register`,
  UserController.validate(userSchema.POST_USER_REGISTER),
  UserController.postUserRegister
);
router.post(
  `${USER_BASE}/login`,
  UserController.validate(userSchema.POST_USER_LOGIN),
  UserController.postUserLogin
);
router.route(USER_BASE)
  .put(UserController.putUser)

module.exports = router;
