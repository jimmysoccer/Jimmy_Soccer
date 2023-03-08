import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Personal() {
  const [data, setData] = useState("");

  function getData() {
    axios
      .get("http://localhost:8080/getAccounts", {
        //注意使用V3方法还是V1方法
        params: {
          Timestamp: Date.now(),
          Action: "DescribeAccounts",
          Version: "2019-01-07",
          Region: "ap-shanghai",
          ClusterId: "cynosdbmysql-b19kz1gu",
          Nonce: 40,
          SecretId: "AKIDFOPmz1pPmwsjWH2lP0ZAjGi9ScuBLK5b",
          Signature: "",
        },
      })
      .then((res) => {
        console.log(res);
        console.log("error code", res.data.Response.Error.Code);
        setData(res);
      })
      .catch((e) => {
        console.log("error", e);
        setData(e.code);
      });
  }

  function fetchFromLocalWebServer() {
    axios
      .get("http://localhost:8080/", {
        params: {
          region: "ap-shanghai",
          endpoint: "cynosdb.tencentcloudapi.com",
          ClusterId: "cynosdbmysql-b19kz1gu",
        },
      })
      .then((res) => {
        console.log("fetch from local server data\n", res);
      })
      .catch();
  }
  function fetchFromSql() {
    axios
      .get("http://localhost:8080/", {
        params: {
          path: "getAllList",
        },
      })
      .then((res) => {
        console.log("fetch from sql\n", res);
      })
      .catch();
  }

  useEffect(() => {
    // getData();
    // fetchFromLocalWebServer();
    fetchFromSql();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>personal life</h2>
      <div className="data-container">
        Mongodb --- TEST DATABASE
        <div>data</div>
      </div>
    </div>
  );
}
