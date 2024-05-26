import { Link, useLocation } from 'react-router-dom';
import { LANGUAGE, NAV_BAR } from '../const/navBar_const';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAtom } from 'jotai';
import { languageAtom } from '../atoms/primitive.atom';
import { language_correct } from '../utils/switch_language';
import { chinaImage, usImage } from '../imgs/images';

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  const pathName = path.split('/')[1];
  const [language, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    document.title = `Jimmy | ${
      pathName.charAt(0).toUpperCase() + pathName.slice(1)
    }`;
  }, [pathName]);

  const handleLanguageButton = (lan) => {
    setLanguage(lan);
  };

  return (
    <div className='navbar justify-content-center mx-2 px-2'>
      <div className='d-flex shadow rounded-pill m-2 p-2'>
        <Grid container justifyContent={'center'}>
          {Object.values(NAV_BAR).map((navItem) => (
            <Link
              key={`nav-bar-${navItem.title}`}
              to={navItem.path}
              className={'nav justify-content-center'}
              style={path.includes(navItem.path) ? { color: '#14b8a6' } : {}}
            >
              {language_correct(language, navItem.title, navItem.titleChinese)}
            </Link>
          ))}
        </Grid>
      </div>
      <Grid container justifyContent={'center'}>
        {Object.values(LANGUAGE).map((lan) => (
          <div
            style={{
              minWidth: '75px',
              cursor: 'pointer',
              color: `${lan.value === language ? '#14b8a6' : ''}`,
            }}
            key={`nav-bar-${lan.value}`}
            onClick={() => handleLanguageButton(lan.value)}
            className='language m-2 p-2 fw-bold text-center'
          >
            <img
              src={lan.value === LANGUAGE.chinese.value ? chinaImage : usImage}
              alt='language-flag'
              className='mx-2'
              style={{ height: '40px' }}
            ></img>
            {lan.title}
          </div>
        ))}
      </Grid>
    </div>
  );
}
