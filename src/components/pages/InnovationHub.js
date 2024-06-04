import { useState } from 'react';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtom, useAtomValue } from 'jotai';
import { languageAtom, loggedInAtom } from '../../atoms/primitive.atom';
import DataTable from '../common/DataTable';
import { Button, TextField } from '@mui/material';
import { fetchDevRecords } from '../../services/fetch-dev-records';
export default function InnovationHub() {
  const language = useAtomValue(languageAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [records, setRecords] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'jimmy' && password === 'jimmy') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  const getDevRecords = async () => {
    const records = await fetchDevRecords();
    if (records) setRecords(records);
  };

  return (
    <div className='container my-5 text-center'>
      <h1 className='text-success'>
        {getCurrentLanguageText(language, 'Innovation Hub', '创新Hub')}
      </h1>
      <h3 className='text-success opacity-50'>
        {getCurrentLanguageText(
          language,
          `Discover groundbreaking designs and state-of-the-art tech solutions that
          redefine the digital experience, showcasing the limitless possibilities
          of innovation.`,
          `发现开创性的设计和前沿技术解决方案，
          重新定义数字体验，
          展示创新的无限可能性。`
        )}
      </h3>

      {loggedIn ? (
        <>
          {records?.length !== 0 ? (
            records.map((record) => <div>{record?.first_name}</div>)
          ) : (
            <div>
              <Button
                className='my-3'
                variant='contained'
                onClick={() => getDevRecords()}
              >
                Click to get data
              </Button>
              <div>No Users</div>
            </div>
          )}
          <div className='container'>
            <DataTable></DataTable>
          </div>
          <Button className='mt-3' variant='contained' onClick={handleLogOut}>
            Log Out
          </Button>
        </>
      ) : (
        <div className='container mt-5 w-25'>
          <form
            className='d-flex flex-column gap-4'
            onSubmit={(e) => handleLogin(e)}
          >
            <TextField
              label={'username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField
              label={'password'}
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button type='submit button' variant='contained'>
              Login
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
