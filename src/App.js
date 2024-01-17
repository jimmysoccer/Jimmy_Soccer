import { Routes, Route, Link, HashRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import Personal from './pages/personal';
import Chat from './pages/chat';
import { NAV_BAR } from './const/navBar';
import About from './pages/about';
import Projects from './pages/projects';
import { useState } from 'react';
import Contact from './pages/contact';

function App() {
  const path = window.location.href;

  const [currentTab, setCurrentTab] = useState(mapUrlToNavBar(path));
  function setHeadTitle(headTitle) {
    document.getElementById('head-title').innerText = headTitle;
  }
  function mapUrlToNavBar(path = '') {
    if (path.includes(NAV_BAR.about.path)) return NAV_BAR.about.path;
    else if (path.includes(NAV_BAR.projects.path)) return NAV_BAR.projects.path;
    else return NAV_BAR.home.path;
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
                    setCurrentTab(navItem.path);
                  }}
                  className={'nav-block'}
                  style={
                    currentTab === navItem.path ? { color: '#14b8a6' } : {}
                  }
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
            path={NAV_BAR.projects.path}
            element={<Projects></Projects>}
          ></Route>
          <Route
            path={NAV_BAR.contact.path}
            element={<Contact></Contact>}
          ></Route>
          {/* <Route
            path={NAV_BAR.developer.path}
            element={<Personal></Personal>}
          ></Route>
          <Route path={NAV_BAR.chat.path} element={<Chat></Chat>}></Route> */}
        </Routes>
        <div className='footer'>
          <div className='footer-nav-list'>
            {Object.values(NAV_BAR).map((navItem) => (
              <Link
                to={navItem.path}
                onClick={() => {
                  setHeadTitle(navItem.header_title);
                  setCurrentTab(navItem.path);
                }}
                className={'footer-nav'}
                style={currentTab === navItem.path ? { color: '#14b8a6' } : {}}
              >
                {navItem.title}
              </Link>
            ))}
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
