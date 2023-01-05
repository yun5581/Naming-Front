// vw, vh 연습용 코드
import React, {useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { useResize, vh, vw} from "../../components/SizeConvert";

//components
import { SF_HambakSnow, Simonetta } from "../../components/Text";
//images
import background from "../../images/background.svg";
import dictionary from "../../images/landingPage/dictionary.svg";
import Footer from "../../components/Footer";

const LandingPage = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []); 

    useResize();
    return (
        <>
            <Background>
                <SF_HambakSnow>
                    <Container>
                        <Title>
                            <p style={{fontSize: vw(25)}}>이름하여 이름하다</p>
                            <hr style={{marginTop:vh(8)}}/>
                            <div style={{fontSize:vw(13)}}>
                            친구들이 정의하는 ‘나’로
                            <br/>
                            나만의 사전을 채워보세요
                            </div>
                        </Title>
                        <object type="image/svg+xml" data={dictionary} className="dic"/>
                        <Button>
                            <Link to="/login">
                                <LoginBtn style={{color:"#FBFBFB"}}>로그인 하기</LoginBtn>
                            </Link>
                            <Link to="/register">
                                <RegisterBtn style={{color:"#2F333E"}}>회원가입 하기</RegisterBtn>
                            </Link>
                            <Link to="/kakao">
                                <KakaoBtn style={{color:"#2F333E"}}>카카오 계정으로 계속하기</KakaoBtn>
                            </Link>
                        </Button>
                    </Container>
                </SF_HambakSnow>
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Background>
        </>
    );
};

const Background = styled.div`
    width: 100%;
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
const Title = styled.div`
    margin-top: ${vh(54)};
    color: #FBFBFB;
    p{
        text-align: center;
    }
    div{
        display: flex;
        justify-content: center;
        text-align: center;
        margin-top: ${vh(20)};
    } 
`
const Button = styled.div`
    height: ${vh(166)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
   
    div{
        height: ${vh(46)};
        width: calc(${vh(46)}*5.22);
        display: flex;
        justify-content: center;
        align-items: center;
      
        border-radius: ${vw(5)};
        text-align: center;
    }
    a{
        text-decoration: none;
        font-size: ${vw(14)};
    }
`
const LoginBtn = styled.div`
    background-color: #2B787D;
`
const RegisterBtn = styled.div`
    background-color: #FBFBFB;
`
const KakaoBtn = styled.div`
    background-color: #FEE500;
`
const FooterWrapper = styled.div`
    display: flex;
    //vertical-align: baseline;

    /* @media (max-height: 830px) {
        position : relative;
        transform : translateY(-100%);
    } */
    margin-top: ${vh(64)};
`
export default LandingPage;