import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";
import Sidebar from "../../components/Sidebar";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import DefinitionInputModal from "../../components/TxtModal/DefinitionInputModal";
import { makrData } from "../../_mock/customInfo";
import { getDictionary, postLike } from "../../api/user";
import { http } from "../../api/http";
import axios from "axios";
// redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVisit_dictionaryID } from "../../redux/dictionarySlice";
//images
import background from "../../images/background.svg";
import like from "../../images/like.svg";
import deleteIcon from "../../images/definePage/delete.svg";
import Footer from "../../components/Footer";
import plusBtn from "../../images/definePage/+Btn.svg";

const VisitorBrowsingPage = () => {
  const [edit, setEdit] = useState(false);
  const [arrCount, setArrCount] = useState();
  const [contents, setContent] = useState({});

  // redux
  const dispatch = useAppDispatch();
  const {visit_dictionaryId} = useAppSelector((state)=>state.dictionary);
  const {visit_dicName} = useAppSelector((state)=>state.visitor);

  useEffect(() => {
    window.scrollTo(0, 0);
    const location = window.location.pathname;
    const id = Number(location.split('/')[3]); //url에서 사전 아이디 받아오기
    dispatch(setVisit_dictionaryID({
      visit_dictionaryId: id,
    }));
    getDictionary(id, 1).then((res) => {
      setContent(res);
      setArrCount(res.length);
    });
  }, []);
  //모달
  const [modal, setModal] = useState(false);

  const OpenModal = () => {
    setModal(true);
  };

  const CloseModal = () => {
    setModal(false);
  };

  const changeConsonant = (e) => {
    const consonant = e.target.getAttribute("data-set");
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    getDictionary(visit_dictionaryId, idx).then((res) => {
      setContent(res);
      setArrCount(res.length);
    });
  };
  const Like = (e) => {
    const id = e.target.getAttribute("id");
    console.log(id);
    axios.post(
      `https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/post/${id}/like`
    );
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  const removeContent = (e) => {
    const id = e.target.getAttribute("id");
    console.log(id);
    http.delete(
      `https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/post/${id}`
    );
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };
  return (
    <>
      <Background>
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
                <Pretendard>{visit_dicName}하다</Pretendard>
              </Title>
            </TitleBox>
            <ContentWrapper>
              <ContentBox>
                {arrCount
                  ? contents.map((ele) => {
                      return (
                        <>
                          {" "}
                          <Content>
                            <div className="countNum">
                              <Pretendard>{ele.id}.</Pretendard>
                            </div>
                            <div className="comment">
                              <Pretendard>{ele.contents}</Pretendard>
                            </div>
                            {edit ? (
                              <div
                                id={ele.id}
                                className="deleteIcon"
                                onClick={removeContent}
                              ></div>
                            ) : (
                              <div className="like" onClick={Like} id={ele.id}>
                                <div className="likeImg" id={ele.id}></div>
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
                    <PlusBtn onClick={OpenModal} />
                    <DefinitionInputModal
                      isIinput={true}
                      open={modal}
                      close={CloseModal}
                      name={visit_dicName}
                    />
              </ContentBox>
            </ContentWrapper>
          </DicPage>
          <DicIndexWrapper>
            <Bookmark>
              {makrData.map((mark) => {
                return (
                  <div data-set={mark.text} onClick={changeConsonant}>
                    <SF_HambakSnow data-set={mark.text}>
                      {mark.text}
                    </SF_HambakSnow>
                  </div>
                );
              })}
            </Bookmark>
          </DicIndexWrapper>
        </DicBook>

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Background>
    </>
  );
};

export default VisitorBrowsingPage;

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
  .deleteIcon {
    background-image: url(${deleteIcon});
    width: ${vw(16)};
    height: ${vw(16)};
  }
  .countNum {
    margin-left: ${vw(16)};
    margin-right: ${vw(6)};
    font-weight: 400;
    font-size: ${vw(12)};
  }
  .likeIcon {
    width: ${vw(13)};
  }
  .likeImg {
    background-image: url(${like});
    background-repeat: none;
    width: ${vw(16)};
    height: ${vw(16)};
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

const EditBtn = styled.div`
  font-weight: 400;
  font-size: ${vw(12)};
  color: #818181;
`;
const Title = styled.div`
  color: #2b787d;
  font-weight: 900;
  font-size: ${vw(20)};
  text-decoration-line: underline;
  text-decoration-thickness: 3px;
`;
const TitleBox = styled.div`
  display: flex;
  margin-bottom: ${vh(29)};
  align-items: baseline;
  justify-content: space-between;
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
const DicBook = styled.div`
  display: flex;
`;
const DicIndexWrapper = styled.div`
  height: ${vh(400)};
  margin-top: ${vh(40)};
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6%;
    background: var(--white);
    border-radius: 0 2px 2px 0;
    font-size: 2px;
  }
`;