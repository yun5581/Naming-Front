import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
//메인
import MainPage from "./pages/mainpage/MainPage";
function App() {
  return (
    <Router>
       <Routes>
          <Route exact path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
