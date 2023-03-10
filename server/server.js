const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var username = ""; //username to TDSQL-C SQL database default: root
var password = ""; //password to TDSQL-C SQL database

app.post("/login", async function (req, res) {
  username = req.body.username;
  password = req.body.password;

  try {
    const mysql = require("mysql");
    // set authentication to database
    const connection = mysql.createConnection({
      host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
      port: "26028",
      database: "test-data",

      user: username,
      password: password,
    });

    //connect to database
    await connection.connect();

    res.json("login done");

    connection.end();
  } catch (error) {
    console.log("***error****\n", error);
  }
});

app.get("/getAllList", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const mysql = require("mysql");

  // set authentication to database
  const connection = mysql.createConnection({
    host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
    port: "26028",
    database: "test-data",

    user: username,
    password: password,
  });

  console.log("*****get All list*****\n");

  //connect to database
  connection.connect();

  //set query SQL
  connection.query(
    "SELECT * FROM restaurants",
    function (error, results, fields) {
      if (error) {
        console.log("******error*********\n", error);
        connection.end();
        return;
      }

      //return searched results to response
      res.json(results);
    }
  );

  //end database connection
  connection.end();
});

app.post("/insertData", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type"
  );
  let query = req.body.query;

  console.log("*****insertData parameter*****\n", query);

  const mysql = require("mysql");

  // set authentication to database
  const connection = mysql.createConnection({
    host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
    port: "26028",
    database: "test-data",

    user: username,
    password: password,
  });

  //connect to database
  connection.connect();

  //set query SQL
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.log("******error*********\n", error);
      connection.end();
      res.json("error");
      return;
    }

    //return searched results to response
    res.json(results);
  });
});

app.get("/getTencentAccounts", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  tencentGetAccounts(req, res);
});

app.get("/test/", function (req, res) {
  res.json("successfully return callback value");
});

//monitor server
app.listen(443, "185.199.108.153", function (req, res) {
  console.log("8080 serveer is running...");
});

function tencentGetAccounts(req, res) {
  //set tencent parameters
  // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
  const tencentcloud = require("tencentcloud-sdk-nodejs");
  const CynosdbClient = tencentcloud.cynosdb.v20190107.Client;

  //parameters
  var region = "";
  var endpoint = "";

  var data = "not fetched data";

  // ??????????????????????????????????????????????????????????????? SecretId ??? SecretKey???????????????????????????????????????
  // ??????????????????????????? SecretId ??? SecretKey ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????https://cloud.tencent.com/document/product/1278/85305
  // ?????????????????????????????? https://console.cloud.tencent.com/cam/capi ????????????
  var clientConfig = {
    credential: {
      secretId: "secretId",
      secretKey: "secretKey",
    },
    region: region,
    profile: {
      httpProfile: {
        endpoint: endpoint,
      },
    },
  };
  region = req.query.region;
  endpoint = req.query.endpoint;
  console.log("request parameters", region, endpoint);

  clientConfig.region = region;
  clientConfig.profile.httpProfile.endpoint = endpoint;

  // ???????????????????????????client??????,clientProfile????????????
  var client = new CynosdbClient(clientConfig);
  var params = {
    ClusterId: req.query.ClusterId,
  };

  client.SearchClusterTables(params).then(
    (response) => {
      data = response;
      res.json(data);
    },
    (err) => {
      console.error("error", err);
      res.json(err);
    }
  );
}
