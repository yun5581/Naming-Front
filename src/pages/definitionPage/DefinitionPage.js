import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { vw, vh } from "../../components/SizeConvert";
import Sidebar from "../../components/Sidebar";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import DefinitionInputModal from "../../components/TxtModal/DefinitionInputModal";
import { makrData } from "../../_mock/customInfo";
import { getDictionary } from "../../api/user";
import { useAppSelector } from "../../redux/store";

//images
import background from "../../images/background.svg";
import like from "../../images/like.svg";
import deleteIcon from "../../images/definePage/delete.svg";
import Footer from "../../components/Footer";
import plusBtn from "../../images/definePage/+Btn.svg";

const DefinitionPage = () => {
  // 사전 아이디 가져오기
  const { dictionaryId } = useAppSelector((state) => state.dictionary);
  const [isLogin, setIsLogin] = useState(false);
  const [edit, setEdit] = useState(false);

  const editItem = () => {
    setEdit(!edit);
  };

  //모달
  const [modal, setModal] = useState(false);
  const OpenModal = () => {
    setModal(true);
  };
  const CloseModal = () => {
    setModal(false);
  };
  const [arrCount, setArrCount] = useState(0);
  const [data, setData] = useState(null);
  const changeConsonant = (e) => {
    const consonant = e.target.getAttribute("data-set");
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    const promise = getDictionary(dictionaryId, idx);
    promise.then((result) => setArrCount(result.data.length));
    promise.then((result) => setData(result.data));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Background>
        <Sidebar />
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
                <Pretendard>이름하다</Pretendard>
              </Title>
              {isLogin ? <EditBtn onClick={editItem}>수정</EditBtn> : null}
            </TitleBox>
            <ContentWrapper>
              <ContentBox>
                {arrCount ? (
                  <Content>
                    <div className="countNum">
                      <Pretendard>{data.postId}.</Pretendard>
                    </div>
                    <div className="comment">
                      <Pretendard>{data.contents}</Pretendard>
                    </div>
                    {edit ? (
                      <object
                        type="image/svg+xml"
                        data={deleteIcon}
                        className="deleteIcon"
                      />
                    ) : (
                      <div className="like">
                        <object
                          type="image/svg+xml"
                          data={like}
                          className="likeIcon"
                        />
                        <div className="likeNum">
                          <SF_HambakSnow>{data.likes}</SF_HambakSnow>
                        </div>
                      </div>
                    )}
                  </Content>
                ) : null}

                {isLogin ? null : (
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
                  <div data-set={mark.text} onClick={changeConsonant}>
                    {mark.text}
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

export default DefinitionPage;

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
