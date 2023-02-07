import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";
import Sidebar from "../../components/Sidebar";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import DefinitionInputModal from "../../components/TxtModal/DefinitionInputModal";
import { makrData } from "../../_mock/customInfo";
import { getDictionary, postLike } from "../../api/user";
import { useAppSelector } from "../../redux/store";
import { http } from "../../api/http";
import axios from "axios";
//components
import Background from "../../components/Background";
//images
import like from "../../images/like.svg";
import likeRed from "../../images/likeRed.svg";
import deleteIcon from "../../images/definePage/delete.svg";
import Footer from "../../components/Footer";
import plusBtn from "../../images/definePage/+Btn.svg";

const DefinitionPage = () => {
  // 사전 아이디 가져오기
  const { dictionaryId } = useAppSelector((state) => state.dictionary);
  const [isLogin, setIsLogin] = useState(false);
  const [edit, setEdit] = useState(false);
  const { name } = useAppSelector((state) => state.user);
  const Login = localStorage.getItem("token"); // 사전 커스텀 정보 가져오기
  const [arrCount, setArrCount] = useState(); // 자음별 정의 갯수 
  const [contents, setContent] = useState({}); // 가져온 정의

  // n번째 지은이 (수정 필요)
  const number = 3;
  // 선택한 북마크 번호, 한글 자음
  const selectNum = sessionStorage.getItem("selectNum");
  const selectMark = sessionStorage.getItem("selectMark");

  useEffect(() => {
    window.scrollTo(0, 0);
    if(!!selectNum){
      getDictionary(dictionaryId, selectNum).then((res) => {
        setContent(res);
        setArrCount(res.length);
      });
    }
    else{
      getDictionary(dictionaryId, 1).then((res) => {
        setContent(res);
        setArrCount(res.length);
      });
    }
  }, []);

  //모달
  const [modal, setModal] = useState(false);

  const OpenModal = () => {
    setModal(true);
  };

  const CloseModal = () => {
    setModal(false);
  };

  const editItem = () => {
    setEdit(!edit);
  };

  const changeConsonant = (e) => {
    const consonant = e.target.getAttribute("data-set");
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    // 페이지 유지용 선택 자음 저장
    sessionStorage.setItem("selectNum", idx);
    sessionStorage.setItem("selectMark", e.target.getAttribute("data-set"));
    getDictionary(dictionaryId, idx).then((res) => {
      setContent(res);
      setArrCount(res.length);
    });
  };

  const Like = (e) => {
    const id = e.target.getAttribute("id");

    axios.post(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/${id}/like`
    );
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const removeContent = (e) => {
    const id = e.target.getAttribute("id");
    http.delete(
      `https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/post/${id}`
    );
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  return (
    <>
      <Background/>
      <Container>
        {Login === null ? null : <Sidebar/>}
        <NumText>
          <SF_HambakSnow>
            총 <span>{arrCount}</span>개의 문장이 쌓여있어요!
          </SF_HambakSnow>
        </NumText>
        <DicBook>
          <DicSidePage></DicSidePage>
          <DicPage>
            <TitleBox>
              <Title>
                <div className="titleName"><Pretendard>{name}하다</Pretendard></div>
                <div className="titleNum"><Pretendard>{number}</Pretendard></div>
              </Title>
              {Login ? <EditBtn onClick={editItem}>수정</EditBtn> : null}
            </TitleBox>
            <ContentWrapper>
              <ContentBox>
                {arrCount
                  ? contents.map((ele, index) => {
                      return (
                        <>
                          {" "}
                          <Content>
                            <div className="countNum">
                              <Pretendard>{index+1}.</Pretendard>
                            </div>
                            <div className="comment">
                              <Pretendard>{ele.contents}</Pretendard>
                            </div>
                            {edit ? (
                              <div className="delete">
                                <div
                                id={ele.id}
                                className="deleteIcon"
                                onClick={removeContent}>
                                </div>
                              </div>   
                            )
                              : (
                              <div className="like"  onClick={Like} id={ele.id}>
                                <div className="likeImg" id={ele.id}/>
                                <div className="likeNum" id={ele.id}>
                                  <SF_HambakSnow>{ele.likes}</SF_HambakSnow>
                                </div>
                              </div>
                            )}
                          </Content>
                        </>
                      );
                    })
                  : null}
                {Login ? null : (
                  <>
                    <PlusBtn onClick={OpenModal} />
                    <DefinitionInputModal
                      isIinput={true}
                      open={modal}
                      close={CloseModal}
                    />
                  </>
                )}
              </ContentBox>
            </ContentWrapper>
          </DicPage>
          <DicIndexWrapper>
            <Bookmark>
              {makrData.map((mark) => {
                return (
                 (selectMark == mark.text)||(!selectMark && mark.text=="ㄱ") ? 
                  (<div data-set={mark.text} onClick={changeConsonant} className="selectM">
                    <SF_HambakSnow data-set={mark.text}>
                      {mark.text}
                    </SF_HambakSnow>
                  </div>)
                  :
                  (<div data-set={mark.text} onClick={changeConsonant} className="noneM">
                  <SF_HambakSnow data-set={mark.text}>
                    {mark.text}
                  </SF_HambakSnow>
                </div>)
                );
              })}
            </Bookmark>
          </DicIndexWrapper>
        </DicBook>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </>
  );
};

export default DefinitionPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
`
const DicBook = styled.div`
  display: flex;
  margin-top: ${vh(40)};
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
const DicIndexWrapper = styled.div`
`;
const Title = styled.div`
  color: #2b787d;
  display: flex;
  .titleName{
    padding-top: 3px;
    font-weight: 900;
    font-size: ${vw(20)};
    text-decoration-line: underline;
    text-decoration-thickness: 2.5px;
    text-underline-offset : 3px; 
  }
  .titleNum{
    font-size: ${vw(14)};
    margin-left: 3px;
    font-weight: 600;
  }
`;
const TitleBox = styled.div`
  display: flex;
  margin-bottom: ${vh(29)};
  align-items: baseline;
  justify-content: space-between;
`;
const EditBtn = styled.div`
  font-weight: 400;
  font-size: ${vw(12)};
  color: #818181;
`;
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
const NumText = styled.div`
  color: white;
  font-weight: 800;
  font-size: ${vw(18)};
  margin-top: ${vh(65)};
  margin-left: ${vw(25)};
  span {
    color: #85d2d7;
  }
`;
const Content = styled.div`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: auto;
  width: 96%;
  margin-bottom: ${vw(16)};
  display: flex;
  align-items: center;

  .deleteIcon {
    background-image: url(${deleteIcon});
    width: ${vw(14)};
    height: ${vw(14)};
  }
  .countNum {
    width: 13%;
    height: ${vh(33)};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .comment {
    width: 70%;
    font-weight: 400;
    font-size: ${vw(12)};
    line-height: 1.5;
    padding: 7px 3px 7px 3px;
  }
  .like, .delete {
    width: 15%;
    height: ${vh(33)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .likeImg {
    width: ${vw(14)};
    height: ${vw(14)};
    background-image: url(${like});
    background-repeat: no-repeat;
    background-position: center center;

  }
  .likeNum {
    font-weight: 800;
    font-size: ${vw(8)};
    color: #818181;
    width: fit-content;
    margin: 0 auto;
  }
`;
const PlusBtn = styled.button`
  background-image: url(${plusBtn});
  background-size: cover;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  margin: 0 auto;
`;
const Bookmark = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: ${vh(25)};
  cursor: pointer;
  div {
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 2px 2px 0;
  }
  .selectM{
    height: 7%;
    background-color: var(--green);
    color: white;
    width: 120%;
    font-size: ${vw(15)};
  }
  .noneM{
    height: 5.5%;
    background-color: var(--white);
    font-size: ${vw(13)};
  }
`;
const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 20px;
`

