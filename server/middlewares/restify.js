module.exports = function() {
  return function(req, res, next) {
    if (/^\/api/.test(req.path)) {
      res.set('Content-Type', 'application/json');
      res.restError = (data, next) => {
        const err = new Error();
        err.message = data;
        err.status = 200;
        next(err);
      };
      res.restData = (data, msg = 'request:ok') => {
        if (res.exp) {
          // 重新生成 token
        }
        res.status(200).json({ code: 'success', data, msg });
      };
    }
    next();
  };
};
