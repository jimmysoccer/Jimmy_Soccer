import { Link, useLocation } from 'react-router-dom';
import { NAV_BAR } from '../const/navBar';

export default function Footer(setHeadTitle) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      style={{ height: '100px' }}
      className='mt-5 border-top border-2 border-dark-subtle d-flex justify-content-center'
    >
      <div className='d-flex'>
        {Object.values(NAV_BAR).map((navItem) => (
          <Link
            to={navItem.path}
            onClick={() => {
              setHeadTitle(navItem.header_title);
            }}
            className={'footer-nav d-flex flex-column justify-content-center'}
            style={path.includes(navItem.path) ? { color: '#14b8a6' } : {}}
          >
            {navItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
