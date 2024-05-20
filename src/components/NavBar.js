import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../const/navBar';

export default function NavBar(setHeadTitle) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='nav-bar'>
      <div className='nav-list'>
        {Object.values(NAV_BAR).map((navItem) => (
          <Link
            key={`nav-bar-${navItem.header_title}`}
            to={navItem.path}
            onClick={() => {
              setHeadTitle(navItem.header_title);
            }}
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
