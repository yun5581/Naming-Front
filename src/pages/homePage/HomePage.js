// vw, vh 연습용 코드
import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useResize, vh, vw } from "../../components/SizeConvert";
import { useAppSelector } from "../../redux/store";
import { http } from "../../api/http.js";

//components
import { SF_HambakSnow, Simonetta } from "../../components/Text";
import Sidebar from "../../components/Sidebar";
import HomeDictionary from "../../components/homePage/HomeDictionary";
//images
import getLink from "../../images/homePage/share.svg";
import background from "../../images/background.svg";
import Footer from "../../components/Footer";

// link copy
//const copyLinkRef = useRef();

const HomePage = () => {
  // 유저 아이디 가져오기 
  const {userId} = useAppSelector((state)=>state.user);
  // 사전 아이디 가져오기
  const { dictionaryId } = useAppSelector((state) => state.dictionary);

  useEffect(() => {
    window.scrollTo(0, 0);
    getInfo();
  }, []);

  const navigate = useNavigate();

  // 사전 커스텀 정보 관리
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [shapeNum, setShapeNum] = useState(0);
  const [shapeColor, setShapeColor] = useState(0);
  const [decoNum, setDecoNum] = useState(0);

  // 사전 커스텀 정보 가져오기
  const getInfo = () => {
    http
      .get(`https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/`)
      .then((res) => {
        setName(res.data.data.firstName);
        setShapeColor(res.data.data.shadowColor);
        setColor(res.data.data.color);
        setShapeNum(res.data.data.shadow);
        setDecoNum(res.data.data.border);
      })
      .catch((error) => {
        alert("사전 커스텀 정보 가져오기 실패");
        // navigate(-1); 
      });
  };
  // 사전 링크 복사하기 
  const copyLink  = async () => {
    try {
      await navigator.clipboard.
      // 도메인 수정 필요
      writeText(`http://localhost:3000/${userId}/visitorLanding/${dictionaryId}`);
      setShow(true);
    } catch (e) {
      setShow(false);
      alert('사전 링크 복사 실패. 버튼을 다시 눌러주세요!');
    }
};
  const [show, setShow] = useState(false);
  return (
    <>
      <Sidebar />
      <Background>
        <HomeDictionary
          name={name}
          color={color}
          shapeNum={shapeNum}
          shapeColor={shapeColor}
          decoNum={decoNum}
        />
        <ButtonWrapper onClick={copyLink}>
          <Button>
            <object type="image/svg+xml" data={getLink} className="getLink" />
            <SF_HambakSnow>내 사전 링크 복사하기</SF_HambakSnow>
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
        </AlertMSG>
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
`;

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
  margin-top: ${vh(15)};
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
  height: 100vh;
  margin-top: 30px;
  padding-bottom: 30px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export default HomePage;
