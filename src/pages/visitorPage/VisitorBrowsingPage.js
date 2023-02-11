import styled, { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDictionary, postLike } from "../../api/user";
import axios from "axios";
// redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVisit_dictionaryID } from "../../redux/dictionarySlice";
import { setVisit_dicName, setVisit_nth, setVisit_stacked } from "../../redux/visitorSlice";
// components 
import { vw, vh } from "../../components/SizeConvert";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import { SF_HambakSnow, Pretendard } from "../../components/Text";
import { makrData } from "../../_mock/customInfo";
import DefinitionInputModal from "../../components/TxtModal/DefinitionInputModal";
import VisitorSidebar from "../../components/visitorPage/VisitorSidebar";
//images
import like from "../../images/like.svg";
import plusBtn from "../../images/definePage/+Btn.svg";
import { AiOutlineHeart } from "react-icons/ai";



const VisitorBrowsingPage = () => {
  const [edit, setEdit] = useState(false);
  const [arrCount, setArrCount] = useState();
  const [contents, setContent] = useState({});

  // 방문한 사전 정보 받아오기 (첫 렌더링)
  const [dicName, setDicName ] =useState(""); // 사전 이름
  const [nth, setNth ] =useState(); // n번째 지은이 
  const [stacked, setStacked] = useState(0); // 총 쌓인 문장 수 

  // 선택한 북마크 번호, 한글 자음
  const selectNum = sessionStorage.getItem("selectNum");
  const selectMark = sessionStorage.getItem("selectMark");

  // redux
  const dispatch = useAppDispatch();
  const {visit_dictionaryId} = useAppSelector((state)=>state.dictionary);
  // 방문한 사전 정보 저장 
  const {visit_dicName, visit_nth, visit_stacked} = useAppSelector((state)=>state.visitor);

  useEffect(() => {
    window.scrollTo(0, 0);
    const location = window.location.pathname;
    const id = Number(location.split('/')[4]); //url에서 사전 아이디 받아오기
    dispatch(setVisit_dictionaryID({
      visit_dictionaryId: id,
    }));
    getInfo(id);
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

  // 방문한 사전 정보 가져오기
  const getInfo = (dictionary_Id) => {
    axios
      .get(`https://kj273456.pythonanywhere.com/dictionary/${dictionary_Id}/`)
      .then((res) => {
        setStacked(res.data.data.stacked); 
        setDicName(res.data.data.firstName);
        dispatch(setVisit_stacked({visit_stacked:res.data.data.stacked}));
        dispatch(setVisit_dicName({visit_dicName:res.data.data.firstName})); 
        getNth(res.data.data.userId); // nth 정보 받아오기
      })
      .catch((error) => {
      })
  };
  // nth 정보 받기
  const getNth = (userId) =>{
    axios.get(`https://kj273456.pythonanywhere.com/accounts/number/${userId}/`)
    .then((res)=>{
        setNth(res.data.data.userNumber+1);
        dispatch(setVisit_nth({visit_nth: res.data.data.userNumber+1}));
    })
  }
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
    const ex = Object.values(consonantIndex)[0].ex;
    // 페이지 유지용 선택 자음 저장
    sessionStorage.setItem("selectNum", idx);
    sessionStorage.setItem("selectMark", e.target.getAttribute("data-set"));
    // 모달용 자음 예시 저장
    sessionStorage.setItem("selectEx", ex);
    getDictionary(visit_dictionaryId, idx).then((res) => {
      setContent(res);
      setArrCount(res.length);
    });
    return e.target.getAttribute("data-set");
  };
  const Like = (e) => {
    const id = e.target.getAttribute("id");
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
        <VisitorSidebar/>
        <NumText>
          <SF_HambakSnow>
            총 <span>{stacked!=0? stacked: visit_stacked}</span>개의 문장이 쌓여있어요!
          </SF_HambakSnow>
        </NumText>
        <DicBook>
          <DicSidePage></DicSidePage>
          <DicPage>
            <TitleBox>
              <Title>
                <div className="titleName">
                  <Pretendard>{dicName!=""? dicName: visit_dicName}하다</Pretendard>
                </div>
                <div className="titleNum"><Pretendard>{nth!=null? nth:visit_nth}</Pretendard></div>
              </Title>
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
                              <div className="like" onClick={Like} id={ele.id}>
                              <AiOutlineHeart className="likeIcon" id={ele.id}/>
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
  .like{
    width: 15%;
    /* border: solid; */
    height: ${vh(33)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .likeIcon {
    width: ${vw(14)};
    height: ${vw(14)};
    color:  #818181;
  }
  .likeNum {
    font-weight: 700;
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
