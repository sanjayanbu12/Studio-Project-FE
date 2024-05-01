import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Topbar from "./components/topbar/Topbar";
import Details from "./components/details/Details";
import Landingpage from "./LandingPage/Landingpage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Topbar />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
