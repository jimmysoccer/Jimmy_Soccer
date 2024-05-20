import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../const/navBar';

export default function Footer(setHeadTitle) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='footer mt-5'>
      <div className='footer-nav-list'>
        {Object.values(NAV_BAR).map((navItem) => (
          <Link
            key={`footer-${navItem.header_title}`}
            to={navItem.path}
            onClick={() => {
              setHeadTitle(navItem.header_title);
            }}
            className={'footer-nav'}
            style={path.includes(navItem.path) ? { color: '#14b8a6' } : {}}
          >
            {navItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
