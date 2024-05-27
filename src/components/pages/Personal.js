import axios from 'axios';
import { useEffect, useState } from 'react';

const urlLink = 'http://124.221.98.15:443';
const localLink = 'http://localhost:8080';
export default function Personal() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUserName] = useState('root');
  const [password, setPassword] = useState('');

  function getTencentAccounts() {
    axios
      .get(`${urlLink}/getTencentAccounts`, {
        params: {
          region: 'ap-shanghai',
          endpoint: 'cynosdb.tencentcloudapi.com',
          ClusterId: 'cynosdbmysql-b19kz1gu',
        },
      })
      .then((res) => {
        console.log('fetch from local server data\n', res);
      })
      .catch();
  }

  function login(username, password) {
    axios
      .post(`${urlLink}/login`, {
        username: username,
        password: password,
        host: 'sh-cynosdbmysql-grp-lm5tq7yq.sql.tencentcdb.com',
        port: '26028',
        database: 'test-data',
      })
      .then((res) => {
        console.log('login status', res);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }

  function fetchSqlData() {
    axios
      .get(`${urlLink}/getAllList`, {})
      .then((res) => {
        console.log('fetch from sql\n', res);
        setData(res.data);
      })
      .catch();
  }

  function test() {
    axios.get(`${urlLink}/getUserNum`, {}).then((res) => {
      console.log('res', res);
    });
  }

  function insertSqlData(query) {
    axios
      .post(`${urlLink}/insertData`, {
        query: query,
      })
      .then((res) => {
        console.log('post res', res);
        if (res.data !== 'error') {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  return (
    <div className='main-content'>
      <div className='main-container' style={{ width: '100%', height: 'auto' }}>
        <h2 style={{ textAlign: 'center' }}>Developing & Test use update</h2>
        <h3 style={{ textAlign: 'center' }}>Tencent Cloud TDSQL-C DATABASE</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <span>
              <input
                placeholder='username'
                title='default: root'
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></input>
            </span>
            <span>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type='password'
                placeholder={'passoword'}
              ></input>
            </span>
            <span>
              <button
                onClick={() => {
                  if ((username || password) === '') {
                    console.log('username or password is missed');
                    return;
                  } else {
                    login(username, password);
                  }
                }}
              >
                login
              </button>
            </span>
          </div>
          <button
            onClick={() => {
              fetchSqlData();
              // test();
            }}
          >
            Refresh
          </button>
          <div>
            <span>
              <input
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
            </span>
            <span>
              <button
                onClick={() => {
                  if (input === '') {
                    return;
                  } else {
                    insertSqlData(input);
                  }
                }}
              >
                run sql query
              </button>
            </span>
          </div>
        </div>
        <div className='row'>
          <div className='column header'>id</div>
          <div className='column header'>name</div>
          <div className='column header'>address</div>
          <div className='column header'>rating</div>
          <div className='column header'>max capacity</div>
        </div>
        <div
          style={{
            overflowY: 'scroll',
            margin: '3px 0 10px 0',
            height: '200px',
          }}
        >
          {data.map((item, index) => {
            let name = item.name;
            let address = item.address;
            let rating = item.rating;
            let maxCapacity = item.maxCapacity;
            return (
              <div className='row' key={index}>
                <div className='column'>{index}</div>
                <div className='column'>{name}</div>
                <div className='column'>{address}</div>
                <div className='column'>{rating}</div>
                <div className='column'>{maxCapacity}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
