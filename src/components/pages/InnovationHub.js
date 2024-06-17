import { useState } from 'react';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtom, useAtomValue } from 'jotai';
import { languageAtom, loggedInAtom } from '../../atoms/primitive.atom';
import DataTable from '../common/DataTable';
import { Button, Grid, TextField } from '@mui/material';
import { fetchDevRecords } from '../../services/fetch-dev-records';
import { motion } from 'framer-motion';

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
    <motion.div
      className='container my-5 text-center'
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
    >
      <div className='px-3'>
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
          )
            .split(' ')
            .map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{' '}
              </motion.span>
            ))}
        </h3>
      </div>

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
          <div className='container d-flex gap-3 flex-wrap'>
            {[1, 2, 3].map((a) => (
              <div
                className='bg-primary-subtle w-100 my-2'
                style={{ height: '200px' }}
              ></div>
            ))}
          </div>
          <Button className='mt-3' variant='contained' onClick={handleLogOut}>
            Log Out
          </Button>
        </>
      ) : (
        <Grid
          container
          md={12}
          justifyContent={'center'}
          className='container mt-5'
        >
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
        </Grid>
      )}
    </motion.div>
  );
}
