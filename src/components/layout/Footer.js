import { Link, useLocation } from 'react-router-dom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { Grid } from '@mui/material';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtom } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { chinaImage, usImage } from '../../assets/images/images';

export default function Footer() {
  const location = useLocation();
  const path = location.pathname;
  const [language, setLanguage] = useAtom(languageAtom);

  const handleLanguageButton = (lan) => {
    setLanguage(lan);
  };

  return (
    <div
      style={{ height: '100px' }}
      className='my-5 border-top border-2 border-dark-subtle d-flex flex-column justify-content-center'
    >
      <Grid container justifyContent={'center'} className='mb-2'>
        {Object.values(LANGUAGE).map((lan) => (
          <div
            style={{
              minWidth: '75px',
              cursor: 'pointer',
              color: `${lan.value === language ? '#14b8a6' : ''}`,
            }}
            key={`footer-${lan.value}`}
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
      <div className='d-flex'>
        <Grid container justifyContent={'center'}>
          {Object.values(NAV_BAR).map((navItem) => (
            <Link
              key={`footer-${navItem.title}`}
              to={navItem.path}
              className={'footer-nav d-flex flex-column justify-content-center'}
              style={
                path === navItem.path || path.startsWith(navItem.path + '/')
                  ? { color: '#14b8a6' }
                  : {}
              }
            >
              {getCurrentLanguageText(
                language,
                navItem.title,
                navItem.titleChinese
              )}
            </Link>
          ))}
        </Grid>
      </div>
    </div>
  );
}
