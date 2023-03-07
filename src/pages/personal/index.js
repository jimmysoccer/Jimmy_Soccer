import "./index.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Personal() {
  const [data, setData] = useState("");

  function getData() {
    axios
      .get("https://cynosdb.tencentcloudapi.com", {
        //注意使用V3方法还是V1方法
        params: {
          Timestamp: Date.now(),
          Action: "DescribeAccounts",
          Version: "2019-01-07",
          Region: "ap-shanghai",
          ClusterId: "cynosdbmysql-b19kz1gu",
          Nonce: 40,
          SecretId: "",
          Signature: "",
        },
      })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((e) => {
        console.log("error", e);
        setData(e.code);
      });
  }

  useEffect(() => {
    getData();
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
