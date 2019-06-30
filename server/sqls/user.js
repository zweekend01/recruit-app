exports.CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id          BIGINT          NOT NULL  AUTO_INCREMENT,
    name        VARCHAR(16)     NOT NULL,
    password    VARCHAR(100)    NOT NULL,
    type        VARCHAR(10)     NOT NULL,
    avatar      BLOB,
    desc        VARCHAR(250),
    PRIMARY KEY (id),
    UNIQUE INDEX uni_name (name)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

// 插入一条用户记录
exports.INSERT = `
  INSERT INTO users (name, password, type) VALUES (?, ?, ?);
`;

// 依据 id 查询用户数据
exports.SELECT_BY_ID = `
  SELECT * FROM users WHERE id = ?;
`;

// 依据 name 查询用户数据
exports.SELECT_BY_NAME = `
  SELECT * FROM users WHERE name = ?;
`;
