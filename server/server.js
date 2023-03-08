const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/getAllList", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const mysql = require("mysql");

  console.log("*****getAllList parameters*****\n", req.query);
  var query = "no query";
  query = req.query.sqlQuery;

  // set authentication to database
  const connection = mysql.createConnection({
    host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
    port: "26028",

    user: "root",
    database: "test-data",

    password: "092700Jimmy",
  });

  //connect to database
  connection.connect();

  //set query SQL
  connection.query(
    query === "no query" ? "SELECT * FROM restaurants" : query,
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

app.get("/test", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json("test only");
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

    user: "root",
    database: "test-data",

    password: "092700Jimmy",
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

//monitor server
app.listen(8080, function (req, res) {
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

  // 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
  // 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
  // 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
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

  // 实例化要请求产品的client对象,clientProfile是可选的
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
