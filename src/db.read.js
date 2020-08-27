const Promise = require("bluebird");
const mysql = require("mysql");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const config = require("./config");

let readAllUser = async () => {
  const connection = mysql.createConnection(config.DB_CONFIG);

  await connection.connectAsync();

  let sql = "SELECT * FROM USER";
  const results = await connection.queryAsync(sql);

  await connection.endAsync();

  return results;
};

module.exports = { readAllUser };
