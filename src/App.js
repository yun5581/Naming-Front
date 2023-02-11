import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthRoute from "./AuthRoute.js";

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
// 방문자 정의 모아보기 페이지
import VisitorBrowsingPage from "./pages/visitorPage/VisitorBrowsingPage";
// 만든이들 페이지
import MakerPage from "./pages/makerPage/MakerPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 랜딩 페이지 */}
        <Route exact path="/" element={<LandingPage />} />
        {/* 로그인 */}
        <Route exact path="/login" element={<LoginPage />} />
        {/* 회원가입 */}
        <Route exact path="/register" element={<RegisterPage />} />
        {/* 가입자 사전 커스텀페이지 */}
        <Route exact path="/custom" element={<AuthRoute component={<CustomPage />}/>} />
        {/* 가입자 홈페이지 */}
        <Route exact path="/home" element={<AuthRoute component={<HomePage />}/>} />
        {/* 가입자 사전 검색 페이지 */}
        <Route exact path="/search" element={<AuthRoute component={<SearchPage />}/>} />
        {/* 가입자 사전 정의 보기 페이지 */}
        <Route exact path="/definition" element={<AuthRoute component={<DefinitionPage />}/>} />
        {/* 가입자 만든이들 페이지 */}
        <Route exact path="/maker" element={<AuthRoute component={<MakerPage />}/>} />
        {/* 사전 방문자 랜딩 페이지 */}
        <Route exact path="/:userId/visitorLanding/:dictionaryId" element={<VisitorLandingPage />}/>
        {/* 사전 방문자 첫 정의 적기 페이지 */}
        <Route exact path="/visitorfirst" element={<VisitorFirstPage />} />
        {/* 사전 방문자 정의 보기 페이지 */}
        <Route exact path="/:userId/visitor/definition/:dictionaryId" element={<VisitorBrowsingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
