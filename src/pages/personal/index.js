import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Personal() {
  const [data, setData] = useState([]);

  function getTencentAccounts() {
    axios
      .get("http://localhost:8080/getTencentAccounts", {
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

  function fetchSqlData(query) {
    axios
      .get("http://localhost:8080/getAllList", {
        params: {
          sqlQuery: query,
        },
      })
      .then((res) => {
        console.log("fetch from sql\n", res);
        setData(res.data);
      })
      .catch();
  }

  function insertSqlData(query) {
    axios
      .post("http://localhost:8080/insertData", {
        query: query,
      })
      .then((res) => {
        console.log("post res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>personal life</h2>
      <div className="data-container">
        Mongodb --- TEST DATABASE
        <div
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => {
            fetchSqlData("SELECT * FROM restaurants");
          }}
        >
          Refresh
        </div>
        <div
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => {
            insertSqlData(
              "INSERT INTO restaurants VALUES ('taco bell2','bultler plaze',8.9,100)"
            );
          }}
        >
          insert data
        </div>
        {data.map((item, index) => {
          return (
            <>
              <div>{item.name}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
