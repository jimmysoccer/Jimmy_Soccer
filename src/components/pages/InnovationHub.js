/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtom, useAtomValue } from 'jotai';
import { languageAtom, loggedInAtom } from '../../atoms/primitive.atom';
import DataTable from '../common/DataTable';
import { Button, Grid, TextField } from '@mui/material';
import { fetchDevRecords } from '../../services/fetch-dev-records';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import '../../assets/styles/innovationHub.css';

function Gallery({ items, setIndex }) {
  return (
    <div className='d-flex justify-content-center my-4'>
      <ul className='gallery-container'>
        {items.map((color, i) => (
          <motion.li
            className='gallery-item'
            key={color}
            onClick={() => setIndex(i)}
            style={{ backgroundColor: color }}
            layoutId={color}
          />
        ))}
      </ul>
    </div>
  );
}

function SingleImage({ color, onClick }) {
  return (
    <div className='single-image-container' onClick={onClick}>
      <motion.div
        layoutId={color}
        className='single-image'
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
export default function InnovationHub() {
  const language = useAtomValue(languageAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [records, setRecords] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(false);
  const [scope, animate] = useAnimate();
  const first = useRef(true);

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
    console.log('records', records);
    if (records) setRecords(records);
  };

  const controlText = async () => {
    await animate(scope.current, { opacity: 0, y: 0 }, { duration: 0 });
    await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 });
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!first.current) {
      controlText();
    }
  }, [language]);

  const numColors = 4 * 4;
  const makeColor = (hue) => `hsl(${hue}, 100%, 50%)`;
  const colors = Array.from(Array(numColors)).map((_, i) =>
    makeColor(Math.round((360 / numColors) * i))
  );

  return (
    <motion.div
      className='container my-5 text-center'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={scope}>Hello</div>
      <AnimatePresence>
        <Gallery items={colors} setIndex={setIndex}></Gallery>
        {index !== false && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            key='overlay'
            className='overlay'
            onClick={() => setIndex(false)}
          />
        )}

        {index !== false && (
          <SingleImage
            key='image'
            index={index}
            color={colors[index]}
            setIndex={setIndex}
            onClick={() => setIndex(false)}
          />
        )}
      </AnimatePresence>
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
            records.map((record) => <div>{record?.firstname}</div>)
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
            <DataTable rows={records}></DataTable>
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
