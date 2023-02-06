// vw, vh 연습용 코드
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";
//images
import background from "../../images/background.svg";
import dictionary from "../../images/landingPage/dictionary.svg";
//components
import Title from "../../components/authPage/Title";
import Footer from "../../components/Footer";
import Background from "../../components/Background";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Background/>
      <Container>
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
      </Container>
      
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;

   .dic {
    width: ${vw(310)};
    border: none;
    /* height: ${vh(252)}; */
    margin: ${vh(28)} 0 ${vh(32)} 0;
  }
`
const ButtonWrapper = styled.div`
  width: ${vw(250)};

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 10;

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
const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  padding: 20px;
`;
export default LandingPage;