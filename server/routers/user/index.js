const express = require('express');
const router = express.Router();

const schema = require('./schema');
const { UserController } = require('../../controllers');
const PREFIX = '/v1/user';

router.post(
  `${PREFIX}/register`,
  UserController.validate(schema.register),
  UserController.register
);
router.post(
  `${PREFIX}/login`,
  UserController.validate(schema.login),
  UserController.login
);

module.exports = router;
