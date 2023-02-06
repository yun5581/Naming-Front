// vw, vh 연습용 코드
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";

//components
import Title from "../../components/authPage/Title";
//images
import background from "../../images/background.svg";
import dictionary from "../../images/landingPage/dictionary.svg";
import Footer from "../../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Background>
        <Title />
        <object type="image/svg+xml" data={dictionary} className="dic" />
        <ButtonWrapper>
          <Link to="/login">
            <LoginBtn style={{ color: "#FBFBFB" }}>로그인 하기</LoginBtn>
          </Link>
          <Link to="/register">
            <RegisterBtn style={{ color: "#2F333E" }}>
              회원가입 하기
            </RegisterBtn>
          </Link>
        </ButtonWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Background>
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  .dic {
    width: ${vw(315)};
    height: ${vh(252)};
    margin: ${vh(28)} 0 ${vh(32)} 0;
  }
`;
const ButtonWrapper = styled.div`
  width: ${vw(250)};

  display: flex;
  flex-direction: column;

  font-family: var(--hb-font);
  div {
    aspect-ratio: 5.8 / 1;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: ${vw(5)};
    text-align: center;
  }
  a {
    text-decoration: none;
    font-size: ${vw(14)};
  }
`;
const LoginBtn = styled.div`
  background-color: #2b787d;
`;
const RegisterBtn = styled.div`
  background-color: #fbfbfb;
  margin: ${vh(14)} 0 ${vh(14)} 0;
`;
const KakaoBtn = styled.div`
  background-color: #fee500;
`;
const FooterWrapper = styled.div`
  padding-bottom: 30px;
  position: absolute;
  bottom: 0;
`;
export default LandingPage;
