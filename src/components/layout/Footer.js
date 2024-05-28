import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../../constants/navbar-items';
import { Grid } from '@mui/material';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';

export default function Footer() {
  const location = useLocation();
  const path = location.pathname;
  const language = useAtomValue(languageAtom);

  return (
    <div
      style={{ height: '100px' }}
      className='mt-5 border-top border-2 border-dark-subtle d-flex justify-content-center'
    >
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
