import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../const/navBar';
import { useEffect } from 'react';
import { Grid } from '@mui/material';

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname;
  const pathName = path.split('/')[1];

  useEffect(() => {
    document.title = `Jimmy | ${
      pathName.charAt(0).toUpperCase() + pathName.slice(1)
    }`;
  }, [pathName]);

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
              {navItem.title}
            </Link>
          ))}
        </Grid>
      </div>
    </div>
  );
}
