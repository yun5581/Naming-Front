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
  const number = 10;
  const [data, setData] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
    getPeople();
  }, []);

  const getPeople = () => {
    http
      .get(
        `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/people/`
      )
      .then((res) => {
        setData(res.data.data);
        // setTimeout(() => {
        //   setData(res.data.data);
        // }, 5000);
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
        <Sidebar />
        <Title>
            {name}하다를 채운 <br/>
            {number}명의 만든이들 
        </Title>
        <DicBook>
          <DicSidePage/>
          <DicPage>
            {/* {!data? (
                  <Loading><div>{name}하다를 채운 만든이들 정보를 불러오는 중이에요!</div></Loading>):null} */}
            <ContentWrapper>
              <ContentBox>
                {data
                  ? data.map((ele) => {
                      return (
                        <Content>
                          <SF_HambakSnow>{ele.nickname}</SF_HambakSnow>
                        </Content>
                      );
                    })
                  : null}
              </ContentBox>
            </ContentWrapper>
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
  /* border: solid; */
`
const DicBook = styled.div`
  display: flex;
  margin-top: ${vh(50)};
  height: ${vh(468)};
`;
const DicSidePage = styled.div`
  width: ${vw(25)};
  background-color: white;
  /* border-right: 1px solid #ecebe8; */
  box-shadow: 0px 0px 2px #848380 inset;
`;
const DicPage = styled.div`
  background-color: white;
  width: ${vw(255)};
  padding: ${vw(16)};
  box-shadow: 0px 0px 3px #848380 inset;
`;
const ContentWrapper = styled.div`
  height: ${vh(435)};
`;

const ContentBox = styled.div`
  overflow-y: scroll;
  height: ${vh(435)};
  display: flex;
  flex-direction: column;

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
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: ${vh(33)};
  width: 96%;
  margin-bottom: ${vw(16)};
  display: flex;
  align-items: center;

  .countNum {
    margin-left: ${vw(16)};
    margin-right: ${vw(6)};
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .likeIcon {
    width: ${vw(13)};
  }
  .likeNum {
    font-weight: 800;
    font-size: ${vw(8)};
    color: #818181;
    width: fit-content;
    margin: 0 auto;
  }
  .comment {
    width: 72%;
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .like {
    align-items: center;
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

const Loading = styled.div`
  width: ${vw(223)};
  height: ${vh(441)};
  position: absolute;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--hb-font);
  div{
    width: 70%;
    text-align: center;
  }
`