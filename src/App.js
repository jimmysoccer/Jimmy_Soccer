import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { ANCHORS, NAV_BAR } from "./constants/navbar-items";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import SeoManager from "./components/common/SeoManager";
import PageLoader from "./components/common/PageLoader";
import Home from "./components/pages/Home";

// Secondary pages are split into their own chunks so the first visit
// only downloads what the home page needs.
const About = lazy(() => import("./components/pages/About"));
const Research = lazy(() => import("./components/pages/Research"));
const Projects = lazy(() => import("./components/pages/Projects"));
const Project = lazy(() => import("./components/pages/Project"));
const Work = lazy(() => import("./components/pages/Work"));
const NotFound = lazy(() => import("./components/pages/NotFound"));
// Private area: its own chunk, rendered only behind authentication.
const CornerRoutes = lazy(() => import("./components/corner/CornerRoutes"));
// Playground (components/pages/Playground.js) is kept in the codebase but
// intentionally not routed for now.

/** Keep old /work/:name links working. */
function LegacyWorkRedirect() {
  const { name } = useParams();
  return <Navigate to={`${NAV_BAR.workingExperience.path}/${name}`} replace />;
}

const redirect = (to) => <Navigate to={to} replace />;

function App() {
  const location = useLocation();
  // Animate between top-level sections, not between nested corner tabs.
  const transitionKey = location.pathname.startsWith(NAV_BAR.corner.path)
    ? NAV_BAR.corner.path
    : location.pathname;

  return (
    <div className="app-shell">
      <ScrollToTop />
      <SeoManager />
      <NavBar />
      <main className="app-main" id="main">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={transitionKey}>
              <Route path={NAV_BAR.home.path} element={<Home />} />
              <Route path={NAV_BAR.research.path} element={<Research />} />
              <Route path={NAV_BAR.projects.path} element={<Projects />} />
              <Route
                path={NAV_BAR.projects.path + "/:name"}
                element={<Project />}
              />
              <Route path={NAV_BAR.about.path} element={<About />} />
              <Route
                path={NAV_BAR.workingExperience.path + "/:name"}
                element={<Work />}
              />
              <Route
                path={NAV_BAR.corner.path + "/*"}
                element={<CornerRoutes />}
              />

              {/* Consolidated / legacy URLs */}
              <Route
                path="/experience"
                element={redirect(ANCHORS.experience)}
              />
              <Route path="/work" element={redirect(ANCHORS.experience)} />
              <Route path="/work/:name" element={<LegacyWorkRedirect />} />
              <Route
                path="/publications"
                element={redirect(ANCHORS.publications)}
              />
              <Route path="/cv" element={redirect(ANCHORS.cv)} />
              <Route path="/contact" element={redirect(ANCHORS.contact)} />
              <Route path="/playground" element={redirect(NAV_BAR.home.path)} />
              <Route
                path="/innovation/*"
                element={redirect(NAV_BAR.corner.path)}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
