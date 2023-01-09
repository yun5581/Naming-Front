import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//component
import Footer from "../../components/Footer";
import { SF_HambakSnow, Simonetta } from "../../components/Text";

//image
import background from "../../images/background.svg";
import dic from '../../images/VisitorLandingPage/dic_visitor.svg'

const VisitorLandingPage = () => {

  const [name, setName] = useState('이름')

  return(
  <>
    <Background>
      <BodyContainer>
        <TitleBox>
          <span style={{'fontSize':'26px'}}>이름하여 이름하다</span>
          <Line/>
          <p style={{'fontSize':'13px'}}>
            {name}에 대한 나만의 정의로 <br/> 
          {name}의 이름 사전을 채워주세요! </p>
        </TitleBox>
      <DicContainer>
        <object type='image/svg+xml' data={dic}>
          <img src={dic}/>
        </object>
      </DicContainer>
        <Link to = '/' style={{textDecoration:'none'}}>
          <Button>
            <p>{name}하다 정의 작성하기</p>
          </Button>
        </Link>
      </BodyContainer>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>
    </Background>
  </>
  )
}



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

const BodyContainer = styled.div`
  margin: 0 auto 0;
`

const TitleBox = styled.div`
  margin-top: 91px;
  font-family: "SF_HambakSnow";
  color: var(--white);
  text-align: center;
  line-height: 16px;
  p{
    margin: 0 auto 18px;
  }
`
const Line = styled.div`
border: 0.5px solid var(--white);
width: 214px;
margin: 14px auto 21px;
`
const DicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto 21px;

  img{
    width: 265.85px;
    height: 384px;
  }
`

const Button = styled.div`
  box-sizing: border-box;
  width: 272px;
  height: 48px;
  background-color: var(--white);
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  p{
    color: var(--blue);
    font-family:'SF_HambakSnow'}
    font-size: 13px;
    `

const FooterWrapper = styled.div`
  margin-top: 60px;
  `

export default VisitorLandingPage