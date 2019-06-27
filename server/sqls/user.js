exports.CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS user (
    id          BIGINT          NOT NULL  AUTO_INCREMENT,
    name        VARCHAR(16)     NOT NULL,
    password    VARCHAR(100)    NOT NULL,
    tel         CHAR(11)        NOT NULL,
    address     VARCHAR(256)    ,
    email       VARCHAR(64)     ,
    PRIMARY KEY (id),
    UNIQUE INDEX uni_name (name),
    UNIQUE INDEX uni_tel (tel)
  );
`;

// 插入一条用户记录
exports.INSERT = `
  INSERT INTO users (name, password, tel, address, email) VALUES (?, ?, ?, ?, ?);
`;

// 依据 id 查询用户数据
exports.SELECT_BY_ID = `
  SELECT * FROM users WHERE id = ?;
`;

// 依据 name 查询用户数据
exports.SELECT_BY_NAME = `
  SELECT * FROM users WHERE name = ?;
`;
