import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import { NAV_BAR } from './const/navBar';
import About from './pages/about';
import Projects from './pages/projects';
import Contact from './pages/contact';
import WorkingExperience from './pages/workingExperience';
import 'bootstrap/dist/css/bootstrap.min.css';
import Project from './pages/projects/project';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  function setHeadTitle(headTitle) {
    document.getElementById('head-title').innerText = headTitle;
  }

  return (
    <div>
      <NavBar setHeadTitle={setHeadTitle} />

      <Routes>
        <Route path='/' element={<Navigate to='/home' />}></Route>
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
        <Route
          path={NAV_BAR.workingExperience.path}
          element={<WorkingExperience></WorkingExperience>}
        ></Route>
        <Route
          path={NAV_BAR.projects.path + '/:name'}
          element={<Project></Project>}
        ></Route>
      </Routes>

      <Footer setHeadTitle={setHeadTitle} />
    </div>
  );
}

export default App;
