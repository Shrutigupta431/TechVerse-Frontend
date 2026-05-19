import Body from "./components/Body";
import Login from "./components/Login";
import { Navbar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* <Route path="/" element={<div>Base Page</div>}></Route> */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
