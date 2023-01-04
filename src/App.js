import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// 랜딩 페이지
import LandingPage from "./pages/landingPage/LandingPage";
function App() {
  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
