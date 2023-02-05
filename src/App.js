import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// 랜딩 페이지
import LandingPage from "./pages/landingPage/LandingPage";
// 로그인 페이지
import LoginPage from "./pages/authPage/LoginPage";
// 회원가입 페이지
import RegisterPage from "./pages/authPage/RegisterPage";
// 사전 커스텀 페이지
import CustomPage from "./pages/customPage/CustomPage";
// 가입자 홈 페이지
import HomePage from "./pages/homePage/HomePage";
// 검색 페이지
import SearchPage from "./pages/searchPage/SearchPage";
//정의 페이지
import DefinitionPage from "./pages/definitionPage/DefinitionPage";
// 방문자 랜딩 페이지
import VisitorLandingPage from "./pages/visitorPage/VisitorLandingPage";
// 방문자 정의 첫작성 페이지
import VisitorFirstPage from "./pages/visitorPage/VisitorFirstPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/custom" element={<CustomPage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/definition" element={<DefinitionPage />} />
        <Route exact 
                path="/:userId/visitorLanding/:dictionaryId"
                element={<VisitorLandingPage />} />
        <Route exact path="/visitorfirst" element={<VisitorFirstPage />} />
      </Routes>
    </Router>
  );
}

export default App;
