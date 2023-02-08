import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDictionary, postLike } from "../../api/user";
import axios from "axios";
// redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVisit_dictionaryID } from "../../redux/dictionarySlice";
// components 
import { vw, vh } from "../../components/SizeConvert";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import { makrData } from "../../_mock/customInfo";
import DefinitionInputModal from "../../components/TxtModal/DefinitionInputModal";
//images
import like from "../../images/like.svg";
import deleteIcon from "../../images/definePage/delete.svg";
import plusBtn from "../../images/definePage/+Btn.svg";

const VisitorBrowsingPage = () => {
  const [edit, setEdit] = useState(false);
  const [arrCount, setArrCount] = useState();
  const [contents, setContent] = useState({});

  // 방문한 사전 정보 받아오기
  const [nth, setNth ] =useState(1); // n번째 지은이 
  const [cNum, setCNum] = useState(0); // 총 쌓인 문장 수 
  // 선택한 북마크 번호, 한글 자음
  const selectNum = sessionStorage.getItem("selectNum");
  const selectMark = sessionStorage.getItem("selectMark");

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
    if(!!selectNum){
      getDictionary(id, selectNum).then((res) => {
        setContent(res);
        setArrCount(res.length);
      });
    }
    else{
      getDictionary(id, 1).then((res) => {
        setContent(res);
        setArrCount(res.length);
      });
    }

  }, []);

  // 방문한 사전 쌓인 문장 수 받기
  const getStacked = (dictionary_Id) => {
    axios
      .get(`https://kj273456.pythonanywhere.com/dictionary/${dictionary_Id}/`)
      .then((res) => {
        setCNum(res.data.data.stacked); // 쌓인 문장 수 저장
        setNth(getNth(res.data.data.userId)); // nth 정보 받아오기
      })
      .catch((error) => {
      })
  };
  const getNth = (user_Id) =>{
     // n번째 지은이 정보 받기
     axios.get(`https://kj273456.pythonanywhere.com/accounts/number//${user_Id}/`)
     .then((res)=>{
          setNth(res.data.data.userNumber+1);
     })
  }
  // 
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
    // 페이지 유지용 선택 자음 저장
    sessionStorage.setItem("selectNum", idx);
    sessionStorage.setItem("selectMark", e.target.getAttribute("data-set"));
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

  return (
    <>
      <Background/>
      <Container>
        {/* 사이드바 자리 */}
        <NumText>
          <SF_HambakSnow>
            총 <span>{cNum}</span>개의 문장이 쌓여있어요!
          </SF_HambakSnow>
        </NumText>
        <DicBook>
          <DicSidePage></DicSidePage>
          <DicPage>
            <TitleBox>
              <Title>
                <div className="titleName"><Pretendard>{visit_dicName}하다</Pretendard></div>
                <div className="titleNum"><Pretendard>{nth}</Pretendard></div>
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
                              <div className="like" onClick={Like} id={ele.id}>
                                <div className="likeImg" id={ele.id}></div>
                                <div className="likeNum" id={ele.id}>
                                  <SF_HambakSnow>{ele.likes}</SF_HambakSnow>
                                </div>
                              </div>
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

export default VisitorBrowsingPage;

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
/* height: ${vh(468)}; */
aspect-ratio: 0.7/ 1;
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