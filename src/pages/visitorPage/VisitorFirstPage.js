import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { vw,vh } from "../../components/SizeConvert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVisit_dicName } from "../../redux/visitorSlice";
//data
import { makrData } from "../../_mock/customInfo";
//component
import { Pretendard,SF_HambakSnow} from "../../components/Text";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import FirstPage1 from "../../components/visitorPage/FirstPage1";
import FirstPage2 from "../../components/visitorPage/FirstPage2";
import FirstPage3 from "../../components/visitorPage/FirstPage3";
import FirstPage4 from "../../components/visitorPage/FirstPage4";
//image
import pagebar1 from '../../images/VisitorPage/pagebar1.svg'
import pagebar2 from '../../images/VisitorPage/pagebar2.svg'
import pagebar3 from '../../images/VisitorPage/pagebar3.svg'
import { FiAlertCircle } from "react-icons/fi"


const VisitorFirstPage = () => {
    // 페이지 라우팅 navigate
    const navigate = useNavigate();
    //redux
    const dispatch = useAppDispatch();
    const {visit_dictionaryId} = useAppSelector(state=>state.dictionary); 
    // 방문 사전 이름, 방문자이름, 방문 사전 유저 아이디 가져오기
    const {visit_dicName, nickname, visit_userId} = useAppSelector(state=>state.visitor); 
    // 페이지 넘기기
    const [page,setPage] = useState(1);
    // 정의 작성 버튼 활성 
    const [btn,setBtn] = useState(false);
    useEffect(()=>{
      // 사전 이름 가져오기
      axios
      .get(`https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/`)
      .then((res) => {
        dispatch(setVisit_dicName({visit_dicName: res.data.data.firstName}));
      });
    },[])
  return(
    <>
      <Background/>
      <Container>
        <DicBook>
          <DicSidePage></DicSidePage>
          <DicPage>
            <ContentWrapper>
              { page!=1 ? page!=2 ? page!=3?
              (<FirstPage4 visit_dicName={visit_dicName} setPage={setPage}/>):
              (<FirstPage3 visit_dicName={visit_dicName} setPage={setPage}/>):
              (<FirstPage2 visit_dicName={visit_dicName} setPage={setPage}/>):
              (<FirstPage1 nickname={nickname} setPage={setPage}/>)
            }
            </ContentWrapper>
           
            <PageBar>
              <object type='image/svg+xml' 
                data={ page!=1 ? page!=2 ? pagebar3 : pagebar2 :pagebar1 }>
              </object>
            </PageBar>
          </DicPage>  
          <DicIndexWrapper>
            <Bookmark>
            {makrData.map((mark) => {
                  return (
                    <div>{mark.text}</div>
                  );
                   })}
            </Bookmark>
          </DicIndexWrapper>
        </DicBook>
        <FooterWrapper>
          <Footer/>
        </FooterWrapper>
      </Container>
    </>
    )
}

export default VisitorFirstPage

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
  margin-top: ${vh(93)};
  width: ${vw(305)};
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
const ContentWrapper = styled.div`
  height: 75%;
  margin-top: 10%;
  margin-bottom: 10%;
  /* border: solid; */
`;
const PageBar = styled.div`
  width: 100%;
  margin-top: 10%;

  display: flex;
  justify-content: center;
`
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
    background-color: var(--white);
    font-size: ${vw(13)};
    font-family: var(--hb-font);
  }
`;
const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 20px;
`