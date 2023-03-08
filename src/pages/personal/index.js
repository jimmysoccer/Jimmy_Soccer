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

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>personal life</h2>
      <div className="data-container">
        Mongodb --- TEST DATABASE
        <div
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => {
            fetchSqlData("SELECT * FROM restaurants WHERE rating >= 4.0");
          }}
        >
          Refresh
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
