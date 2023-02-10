import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useResize, vh, vw } from "../../components/SizeConvert";
import { http } from "../../api/http.js";
// redux
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { setCommentNum } from "../../redux/dictionarySlice";

//components
import { SF_HambakSnow, Simonetta } from "../../components/Text";
import Sidebar from "../../components/Sidebar";
import HomeDictionary from "../../components/homePage/HomeDictionary";
//images
import getLink from "../../images/homePage/share.svg";
import background from "../../images/background.svg";
import Footer from "../../components/Footer";
import Background from "../../components/Background";
import BlockModal from "../../components/authPage/BlockModal";

// link copy
//const copyLinkRef = useRef();

const HomePage = () => {
  // redux
  const dispatch = useAppDispatch();
  // 유저 아이디 가져오기 
  const {userId} = useAppSelector((state)=>state.user);
  // 사전 아이디 가져오기
  const { dictionaryId } = useAppSelector((state) => state.dictionary);

  useEffect(() => {
    window.scrollTo(0, 0);
    getInfo();
  }, []);

  const navigate = useNavigate();
  
  // 버튼 클릭시 이동
  function scrollto(e){
    e.target.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // 사전 커스텀 정보 관리
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [shapeNum, setShapeNum] = useState(0);
  const [shapeColor, setShapeColor] = useState(0);
  const [decoNum, setDecoNum] = useState(0);

  const getInfo = () => {
    http
      .get(`https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/`)
      .then((res) => {
        setName(res.data.data.firstName);
        setShapeColor(res.data.data.shadowColor);
        setColor(res.data.data.color);
        setShapeNum(res.data.data.shadow);
        setDecoNum(res.data.data.border);
        dispatch(setCommentNum({commentNum: res.data.data.stacked})); // 쌓인 문장 수 저장
      })
      .catch((error) => {
        //alert("사전 커스텀 정보 가져오기 실패");
        // navigate(-1); 
      })
  };
  // 사전 링크 복사하기 
  const copyLink  = async () => {
    try {
      await navigator.clipboard.
      // 도메인 수정 필요
      writeText(`https://naming-likelion.vercel.app/${userId}/visitorLanding/${dictionaryId}`);
      // writeText(`http://localhost:3000/${userId}/visitorLanding/${dictionaryId}`);
      setShow(true);
    } catch (e) {
      setShow(false);
      alert('사전 링크 복사 실패. 버튼을 다시 눌러주세요!');
    }
  };
  // 사전 정보를 다 받아왔는지 확인 하는 함수
  const checkInfo = () =>{
    var check = false;
    shapeNum!=0 && name!=""&& color!="" && shapeColor!=0 ? check = true : check = false;
    return check;
  }
  const [show, setShow] = useState(false);
  return (
    <>
      <Sidebar />
      <Background/>
      <Container>
      {checkInfo()==false? <BlockModal/> :
        (<><HomeDictionary
          name={name}
          color={color}
          shapeNum={shapeNum}
          shapeColor={shapeColor}
          decoNum={decoNum}
        />
        <ButtonWrapper onClick={copyLink}>
          <Button>
            <object type="image/svg+xml" data={getLink} className="getLink" />
            <SF_HambakSnow>
            {show ? (
              <div>내 사전 링크 복사 완료!</div>
          ) : (
              <div>내 사전 링크 복사하기</div>
          )}
          </SF_HambakSnow>
          </Button>
        </ButtonWrapper>
        <AlertMSG>
          {show ? (
            <SF_HambakSnow>
              사전 링크가 클립보드에 복사되었습니다.
            </SF_HambakSnow>
          ) : (
            <SF_HambakSnow>
             </SF_HambakSnow>
          )}
        </AlertMSG></>)}
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
    overflow: scroll;
`

const AlertMSG = styled.div`
  font-weight: 800;
  font-size: 12px;
  color: var(--white);
  margin-top: ${vh(20)};
  height: 15px;
`;

const ButtonWrapper = styled.button`
  width: ${vw(272)};
  height: ${vh(46)};
  background: #ffffff;
  border-radius: 5px;
  margin-top: ${vh(5)};
`;

const Button = styled.div`
  height: ${vh(46)};
  width: fit-content;
  margin: auto;
  color: var(--blue);
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  .getLink {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
`;

const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 20px;
`
export default HomePage;
