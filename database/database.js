import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "test",
});

export default db;
