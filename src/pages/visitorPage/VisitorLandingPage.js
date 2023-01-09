import React, {useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { useResize, vh, vw} from "../../components/SizeConvert";

//component
import Footer from "../../components/Footer";

//image
import background from "../../images/background.svg";
import dic from '../../images/VisitorLandingPage/dic_visitor.svg'

const VisitorLandingPage = () => {
  useResize();


  return(
  <>
    <Background>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>    
    </Background>
  </>
  )
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .dic{
      width: ${vw(192.65)};
      height: ${vh(280)};
      margin:  ${vh(28)} 0 ${vh(32)} 0;
    }
`

const FooterWrapper = styled.div`
  display: flex;
  margin-top: ${vh(64)};
`

export default VisitorLandingPage