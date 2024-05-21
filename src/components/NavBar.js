import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../const/navBar';
import { useEffect } from 'react';

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
    <div className='navbar justify-content-center'>
      <div className='d-flex shadow rounded-pill'>
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
      </div>
    </div>
  );
}
