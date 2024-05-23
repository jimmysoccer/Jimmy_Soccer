import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/homePage';
import { NAV_BAR } from './const/navBar';
import About from './pages/about';
import Projects from './pages/projects/projects';
import Contact from './pages/contact';
import WorkingExperience from './pages/workingExperience';
import 'bootstrap/dist/css/bootstrap.min.css';
import Project from './pages/projects/project';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import InnovationHub from './pages/innovationHub/InnovationHub';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path='/' element={<Navigate to='/home' />}></Route>
        <Route path={NAV_BAR.home.path} element={<Home></Home>}></Route>
        <Route path={NAV_BAR.about.path} element={<About></About>}></Route>
        <Route
          path={NAV_BAR.workingExperience.path}
          element={<WorkingExperience></WorkingExperience>}
        ></Route>
        <Route
          path={NAV_BAR.projects.path}
          element={<Projects></Projects>}
        ></Route>
        <Route
          path={NAV_BAR.projects.path + '/:name'}
          element={<Project></Project>}
        ></Route>
        <Route
          path={NAV_BAR.contact.path}
          element={<Contact></Contact>}
        ></Route>
        <Route
          path={NAV_BAR.innovationHub.path}
          element={<InnovationHub />}
        ></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
