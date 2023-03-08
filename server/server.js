getDatabase();

function tencent() {
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
      secretId: "AKIDFOPmz1pPmwsjWH2lP0ZAjGi9ScuBLK5b",
      secretKey: "NYXNB2pV7f293pSsIaj8KG4g7NRIwNgq",
    },
    region: region,
    profile: {
      httpProfile: {
        endpoint: endpoint,
      },
    },
  };

  //set local web server

  var express = require("express");
  var app = express();

  app.get("/getAccounts", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

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
  });

  app.listen(8080, function (req, res) {
    console.log("Server is running at port 8080 for tencent data");
  });
}

function getDatabase() {
  var express = require("express");
  var app = express();

  app.get("/", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log(req.query);

    // get the client

    const mysql = require("mysql");

    // create the connection to database

    const connection = mysql.createConnection({
      host: "sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com",
      port: "26028",

      user: "root",
      database: "test-data",

      password: "092700Jimmy",
    });

    connection.connect();

    connection.query(
      "SELECT * FROM restaurants",
      function (error, results, fields) {
        if (error) {
          console.log("******error*********\n", error);
          connection.end();
          return;
        }
        res.json(results);
      }
    );

    connection.end();
  });

  //   app.get("/test", function (req, res) {
  //     res.setHeader("Content-Type", "application/json");
  //     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  //     res.json("lalala");
  //   });

  var server = app.listen(8080, function (req, res) {
    console.log("Server is running..");
  });
}

// const express = require("express");
// const router = express.Router();
// const app = express();

// const databaseRoute = require("./database");

// app.use("./database", databaseRoute);

// app.listen(8080, function (req, res) {
//   console.log("8080 serveer is running...");
// });
