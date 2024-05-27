import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import { NAV_BAR } from './constants/navbar-items';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';
import WorkingExperience from './components/pages/Work';
import 'bootstrap/dist/css/bootstrap.min.css';
import Project from './components/pages/Project';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import InnovationHub from './components/pages/InnovationHub';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
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
