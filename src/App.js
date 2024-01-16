import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Personal from './pages/personal';
import Chat from './pages/chat';
import { NAV_BAR } from './const/navBar';
import About from './pages/about';

function App() {
  function setHeadTitle(headTitle) {
    document.getElementById('head-title').innerText = headTitle;
  }

  return (
    <>
      <HashRouter>
        <ul className='nav-bar'>
          <div className='nav-list'>
            {Object.values(NAV_BAR).map((navItem) => (
              <li>
                <Link
                  to={navItem.path}
                  onClick={() => {
                    setHeadTitle(navItem.header_title);
                  }}
                  className={'nav-block'}
                >
                  {navItem.title}
                </Link>
              </li>
            ))}
          </div>
        </ul>
        <Routes>
          <Route path={NAV_BAR.home.path} element={<Home></Home>}></Route>
          <Route path={NAV_BAR.about.path} element={<About></About>}></Route>
          <Route
            path={NAV_BAR.developer.path}
            element={<Personal></Personal>}
          ></Route>
          <Route path={NAV_BAR.chat.path} element={<Chat></Chat>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
