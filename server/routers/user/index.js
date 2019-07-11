const express = require('express');
const router = express.Router();

const userSchemaCreator = require('./schema');
const { UserController } = require('../../controllers');
const USER_BASE = '/v1/user';

router.post(
  `${USER_BASE}/register`,
  UserController.validate(userSchemaCreator.postUserRegister),
  UserController.postUserRegister
);
router.post(
  `${USER_BASE}/login`,
  UserController.validate(userSchemaCreator.postUserLogin),
  UserController.postUserLogin
);
router.route(USER_BASE)
  .put(UserController.validate(userSchemaCreator.postUser), UserController.putUser)

module.exports = router;
