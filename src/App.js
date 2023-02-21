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

function App() {
  return (
    <>
      <div className="App">JIMMY SOCCER</div>
      <BrowserRouter>
        <Link to={"/"}>
          <div>HOME</div>
        </Link>
        <Link to={"/personal"}>
          <div>Personal Life</div>
        </Link>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="personal" element={<Personal></Personal>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
