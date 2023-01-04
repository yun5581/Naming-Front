import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// 랜딩 페이지
import LandingPage from "./pages/landingPage/LandingPage";
// 로그인 페이지 
import LoginPage from "./pages/authPage/LoginPage";

function App() {
  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<LandingPage />} />  
      </Routes>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
 