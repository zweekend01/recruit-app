const { userSql } = require('../sqls');

class UserModel {
  constructor(db) {
    this.db = db;
  }

  /**
   * 插入一条用户记录
   * @param {Object} user
   * @param {string} user.name
   * @param {string} user.password
   * @param {string} user.tel
   * @param {string} [user.address]
   * @param {string} [user.email]
   * @param {Function} cb
   */
  insert({ name, password, tel, address = '', email = '' }, cb) {
    const values = [name, password, tel, address, email];
    this.db.query(userSql.INSERT, values, (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    })
  }

  /**
   * 依据 id 查询用户的数据
   * @param {number} id
   * @param {Function} cb
   */
  selectById(id, cb) {
    this.query(userSql.SELECT_BY_ID, (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  }

  /**
   * 依据 name 查询用户数据
   * @param {string} name
   * @param {Function} cb
   */
  selectByName(name, cb) {
    this.db.query(userSql.SELECT_BY_NAME, [name], (err, results) => {
      if (err) return cb(err);
      return cb(null, results);
    });
  }
}

module.exports = UserModel;
