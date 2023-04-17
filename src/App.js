import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/homePage";
import Personal from "./pages/personal";
import Chat from "./pages/chat";

function App() {
  function setHeadTitle(headTitle) {
    document.getElementById("head-title").innerText = headTitle;
  }

  return (
    <>
      <BrowserRouter>
        <ul className="nav-bar">
          <li>
            <Link
              to={"/Jimmy_Soccer"}
              onClick={() => {
                setHeadTitle("Jimmy | Home");
              }}
              className="title"
            >
              Jimmy Soccer
            </Link>
          </li>
          <li>
            <Link
              to={"/Jimmy_Soccer"}
              onClick={() => {
                setHeadTitle("Jimmy | Home");
              }}
              className={"nav-block"}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to={"/developer"}
              onClick={() => {
                setHeadTitle("Jimmy | Test");
              }}
              className={"nav-block"}
            >
              Developing
            </Link>
          </li>
          <li>
            <Link
              to={"/chat"}
              onClick={() => {
                setHeadTitle("Jimmy | Chat");
              }}
              className={"nav-block"}
            >
              Chat
            </Link>
          </li>
        </ul>
        <Routes>
          <Route path="/Jimmy_Soccer" element={<Home></Home>}></Route>
          <Route path="developer" element={<Personal></Personal>}></Route>
          <Route path="chat" element={<Chat></Chat>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
