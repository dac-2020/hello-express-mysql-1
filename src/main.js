const Promise = require("bluebird");
const mysql = require("mysql");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const express = require("express");
const app = express();

const dbadd = require("./db.add");
const dbread = require("./db.read");

app.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    const password = req.query.password;
    const email = req.query.email;
    const mobile = req.query.mobile;

    const connection = mysql.createConnection({
      user: "mysql",
      password: "mysql",
      host: "192.168.64.5",
      database: "DAC2020",
    });

    await connection.connectAsync();

    let sql =
      "INSERT INTO USER (USERNAME, PASSWORD, EMAIL, MOBILE) VALUES (?, ?, ?, ?)";
    await connection.queryAsync(sql, [username, password, email, mobile]);

    await connection.endAsync();

    const json = { message: "Hurrrayyy, Record Added, Lets Celebrate!!" };
    res.json(json);
  } catch (err) {
    const json = { message: "Error Occured!!" };
    res.json(json);
  }
});

app.get("/adduser", async (req, res) => {
  try {
    const input = req.query;
    await dbadd.addRecord(input);

    const json = { message: "Success" };
    res.json(json);
  } catch (err) {
    const json = { message: "Failure" };
    res.json(json);
  }
});

app.get("/alluser", async (req, res) => {
  try {
    const results = await dbread.readAllUser();

    res.json(results);
  } catch (err) {
    const json = { message: "Failure" };
    res.json(json);
  }
});

app.listen(3000);
