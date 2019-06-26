const express = require('express');
const router = express.Router();

const { UserController } = require('../controllers');
const PREFIX = '/v1/users';

router.post(`${PREFIX}/register`, UserController.register);
router.post(`${PREFIX}/login`, UserController.login);
router.get(`${PREFIX}/logout`, UserController.logout);

module.exports = router;
