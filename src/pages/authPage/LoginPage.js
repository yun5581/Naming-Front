import styled from "styled-components";
import { useState, useEffect } from "react";
import { useResize, vh, vw} from "../../components/SizeConvert";
//components
import { SF_HambakSnow } from "../../components/Text";
import Footer from "../../components/Footer";
import Title from "../../components/authPage/Title";
//images
import background from "../../images/background.svg";

const LoginPage = () =>{
    useResize();
    // 회원가입 정보관리
    const [id, setID] = useState("");
    const [password, setPW] = useState("");
    const Login =()=>{
    }
    return(
        <>
            <Background>
                <SF_HambakSnow>
                    <Container>
                        <Title/>
                            <LoginForm>
                            <input 
                                className="id"
                                // value={id}
                                placeholder="아이디"
                                onChange={e => setID(e.target.value)}
                                />
                            <input
                                className="pw"
                                type="password"
                                placeholder="비밀번호"
                                onChange={e => setPW(e.target.value)}
                                />
                            <LoginBtn type="submit" 
                                className={ id!=""&&password!="" ? 'active' : ''}
                               >로그인 하기</LoginBtn>
                            </LoginForm>
                    </Container>
                </SF_HambakSnow>
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Background>
        </>
    );
};

export default LoginPage;

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
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: ${vh(45)};
    .pw{
        margIn: ${vh(16)} 0 ${vh(16)};
    }
    input{
        width: calc(${vh(46)}*5.22);
        height: ${vh(46)};
        padding-left: 16px;
        
        font-family: 'SF_HambakSnow';
        font-size: calc(${vh(46)}*0.32);
        border-style: none;
        border-radius: 5px;
        outline: none;
    }
`
const LoginBtn = styled.button`
    width: 100%;
    height: ${vh(46)};

    border-style: none;
    border-radius: 5px;

    font-family: 'SF_HambakSnow';
    font-size: calc(${vh(46)}*0.32);
    color: var(--white);
    background-color: var(--gray1);
    &.active {
		background-color: var(--green);
	}
`
const FooterWrapper = styled.div`
    position: absolute;
    bottom: 45px;
`