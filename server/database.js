// Importing the module
const express = require("express");

// Creating express Router
const router = express.Router();

// Handling login request
router.get("/", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("This is the login request");
});
module.exports = router;

// app.get("/", function (req, res) {
//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//     // get the client

//     const mysql = require("mysql");

//     // create the connection to database

//     const connection = mysql.createConnection({
//       host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
//       port: "26028",

//       user: "root",
//       database: "test-data",

//       password: "092700Jimmy",
//     });

//     connection.connect();

//     connection.query(
//       "SELECT * FROM restaurants",
//       function (error, results, fields) {
//         if (error) {
//           console.log("******error*********\n", error);
//           connection.end();
//           return;
//         }
//         res.json(results);
//       }
//     );

//     connection.end();
//   });
