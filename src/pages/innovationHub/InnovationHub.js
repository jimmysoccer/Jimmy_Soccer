import { useEffect, useState } from 'react';
import axios from 'axios';
export default function InnovationHub() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('http://111.229.172.53/dev/get_all_records')
      .then((res) => {
        const data = res?.data;
        setRecords(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <div className='container my-5 text-center'>
      <h1 className='text-success'>Innovation Hub</h1>
      <h3 className='text-success opacity-50'>
        Discover groundbreaking designs and state-of-the-art tech solutions that
        redefine the digital experience, showcasing the limitless possibilities
        of innovation.
      </h3>
      {records.map((record) => (
        <div>{record?.first_name}</div>
      ))}
    </div>
  );
}
