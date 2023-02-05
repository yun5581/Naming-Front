import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useResize, vh, vw } from "../../components/SizeConvert";
import { useAppSelector } from "../../redux/store";
import { http } from "../../api/http.js";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import background from "../../images/background.svg";

import { SF_HambakSnow } from "../../components/Text";

const MakerPage = () => {
  const { dictionaryId } = useAppSelector((state) => state.dictionary);
  const [data, setData] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPeople = () => {
    http
      .get(
        `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/people/`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        alert("만들이들가져오기 실패");
      });
  };

  useEffect(() => {}, []);
  getPeople();
  return (
    <>
      <Background>
        <Sidebar />
        <DicBook>
          <DicSidePage></DicSidePage>
          <DicPage>
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
      </Background>
    </>
  );
};

export default MakerPage;

const ContentWrapper = styled.div`
  height: 85%;
`;

const ContentBox = styled.div`
  overflow-y: scroll;
  height: 100%;
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

const DicBook = styled.div`
  display: flex;
  margin-top: ${vh(80)};
`;

const DicSidePage = styled.div`
  height: ${vh(400)};
  width: ${vw(25)};
  margin-top: ${vh(40)};
  background-color: white;
  border-right: 2px solid #ecebe8;
  box-shadow: 0px 0px 9px #848380;
`;
const DicPage = styled.div`
  background-color: white;
  width: ${vw(255)};
  height: ${vh(400)};
  margin-top: ${vh(40)};
  padding: ${vw(16)};
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
