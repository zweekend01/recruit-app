
class UserController {
  static register(req, res, next) {
    res.restError({
      code: 'fail',
      data: null,
      msg: 'asdas'
    }, next);
  }

  static login(req, res, next) {

  }

  static logout(req, res, next) {

  }
}

module.exports = UserController;
