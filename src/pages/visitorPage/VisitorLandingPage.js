import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { vw, vh } from "../../components/SizeConvert.js";
import { useAppDispatch } from "../../redux/store.js";
//api 
import { http } from "../../api/http";
import axios from "axios";

//component
import Footer from "../../components/Footer";
import TxtInputModal from "../../components/TxtModal/NameInputModal";
import VisitorDictionary from "../../components/visitorLandingPage/VisitorDictionary";

//image
import background from "../../images/background.svg";
import { setVisit_dictionaryID } from "../../redux/dictionarySlice.js";

const VisitorLandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // 사전 정보 가져오기
  const [name, setName] = useState("이름"); 
  const [color, setColor] = useState("");
  const [shapeNum, setShapeNum] = useState(0);
  const [shapeColor, setShapeColor] = useState(0);
  const [decoNum, setDecoNum] = useState(0);

  useEffect(() => {
    const location = window.location.pathname;
    const id = Number(location.split('/')[3]); //url에서 사전 아이디 받아오기
    dispatch(setVisit_dictionaryID({
      visit_dictionaryId: id,
    }))
    axios
    .get(`https://kj273456.pythonanywhere.com/dictionary/${id}/`)
    .then((res) => {
      setName(res.data.data.firstName);
      setShapeColor(res.data.data.shadowColor);
      setColor(res.data.data.color);
      setShapeNum(res.data.data.shadow);
      setDecoNum(res.data.data.border);
    })
    .catch((error) => {
    });
  }, []);

  // 사전 정보를 다 받아왔는지 확인 하는 함수
  const checkInfo = () =>{
    var check = false;
    shapeNum!=0 ? check = true : check = false;
    return check;
  }

  //모달
  const [modal, setModal] = useState(false)
  const OpenModal = () => {
    setModal(true)
  }
  const CloseModal = () => {
    setModal(false)
  }
  const Name = '작성해주신 이름은 '+'\n '+(name)+"하다 사전의 '만들이들' 목록에 기재됩니다."

  return(
  <>
    <Background>
      <BodyContainer className={ !checkInfo() ? 'false' : ''}>
        <TitleBox>
          <span style={{'fontSize':vw(26)}}>이름하여 이름하다</span>
          <Line/>
          <p style={{'fontSize':vw(13)}}>
            {name}에 대한 나만의 정의로 <br/> 
          {name}의 이름 사전을 채워주세요! </p>
        </TitleBox>
        <VisitorDictionary
            name={name} 
            color={color}
            shapeNum={shapeNum}
            shapeColor={shapeColor}
            decoNum={decoNum}
          />
          <Button onClick={OpenModal}>
            <p>{name}하다 정의 작성하기</p>
          </Button>
          <TxtInputModal
          isIinput = {true}
          open={modal}
          close={CloseModal}
          header='작성자의 이름을 알려주세요'
          maintext={Name}
           />
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
  &.false{
        visibility: hidden;
    }
`

const TitleBox = styled.div`
  margin-top: ${vh(54)};
  font-family: "SF_HambakSnow";
  color: var(--white);
  text-align: center;
  line-height: ${vh(20)};
  p{
    margin: 0 auto ${vh(18)};
  }
`
const Line = styled.div`
border: 0.5px solid var(--white);
width: ${vw(214)};
margin: ${vh(14)} auto ${vh(21)};
`

const Button = styled.div`
  box-sizing: border-box;
  width: ${vw(272)};
  aspect-ratio: 7/ 1;
  background-color: var(--white);
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  p{
    color: var(--blue);
    font-family:'SF_HambakSnow'}
    font-size: ${vw(13)};
    `

const FooterWrapper = styled.div`
    position:absolute;
    bottom: 0;
    padding-bottom: ${vh(42)};
  `

export default VisitorLandingPage