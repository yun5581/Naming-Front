import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useResize, vh, vw } from "../../components/SizeConvert";
import { useAppSelector } from "../../redux/store";
import { http } from "../../api/http.js";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Background from "../../components/Background";

import { SF_HambakSnow } from "../../components/Text";

const MakerPage = () => {
  const { dictionaryId } = useAppSelector((state) => state.dictionary);
  const { name } = useAppSelector((state)=>state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getPeople();
  }, []);
  // 색상 랜덤 함수 
  const randColor = () =>{
    const n = Math.floor(Math.random()*5);
    var color;
    switch(n){
      case 0: color = "#0B0B0B"; break; // black
      case 1: color = "#2B787D"; break; // green
      case 2: color = "#005686"; break; // blue
      case 3: color = "#BABABA"; break; // gray1
      default: color = "#818181"; // gray2
    }
    return color;
  }
  // 배치 랜덤 함수
  const randAlign = () =>{
    const n = Math.floor(Math.random()*5);
    var px;
    switch(n){
      case 0: px = vw(5); break; // black
      case 1: px = vw(10); break; // green
      case 2: px = vw(15); break; // blue
      case 3: px = vw(20); break; // gray1
      default: px = vw(25) // gray2
    }
    return px;
  }

  const getPeople = () => {
    http
      .get(
        `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/people/`
      )
      .then((res) => {
        const raw = res.data.data;
        // 공란 제거
        const filter1 = raw.filter((data) => {
          return data.nickname!= ""
        });
        // 중복 이름 제거
        const filter2 = filter1.map((data)=>
           data.nickname);
        const set = new Set(filter2);
        const uniqueMaker = [...set];
        setData(uniqueMaker);
      })
      .catch((error) => {
        // alert("만들이들가져오기 실패");
        // window.location.reload();
      });
  };

  return (
    <>
      <Background/>
      <Container>
        <Sidebar/>
        <Title>
            {name}하다를 채운 <br/>
            {data.length==0?"n":data.length}명의 만든이들 
        </Title>
        <DicBook>
          <DicSidePage/>
          <DicPage>
              <ContentBox>
              {data
                  ? data.map((ele) => {
                      return (
                        <Content>
                          <SF_HambakSnow style={{color: randColor()}}>{ele}</SF_HambakSnow>
                        </Content>
                      );
                    })
                  : null}
              </ContentBox>
          </DicPage>
        </DicBook>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </>
  );
};

export default MakerPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    font-family: var(--hb-font);
`
const Title = styled.div`
  width: 100%;
  width: ${vw(277)};
  height: ${vh(42)};
  margin-top: ${vh(50)};

  display: flex;
  justify-content: flex-end;
  color: var(--white);
`
const DicBook = styled.div`
  display: flex;
  margin-top: ${vh(40)};
  width: ${vw(300)};
  aspect-ratio: 0.15/1;
  @media only screen  and (min-width: 700px) and (max-width: 850px){
    height: 70%;
  }
`;
const DicSidePage = styled.div`
  width: ${vw(25)};
  background-color: white;
  /* border-right: 1px solid #ecebe8; */
  box-shadow: 0px 0px 2px #848380 inset;
`;
const DicPage = styled.div`
  background-color: white;
  width: ${vw(280)};
  padding: ${vw(16)};
  box-shadow: 0px 0px 3px #848380 inset;
`;

const ContentBox = styled.div`
  overflow-y: scroll;
  /* height: 100%; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 6px;
    height: 100%;
    background-color: #f8f8f8;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #2b787d;
    border-radius: 50px;
  }
`;

const Content = styled.div`
  height: ${vh(40)};
  width: auto;
  display: flex;
  align-items: center;
  font-size: ${vw(17)};
  padding: 0 ${vw(20)};
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
