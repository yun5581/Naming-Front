import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResize, vh, vw } from "../../components/SizeConvert";
import { useSelector } from "react-redux";
import { http } from "../../api/http.js";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Background from "../../components/Background";

import background from "../../images/background.svg";
import searchImg from "../../images/searchPage/searchImg.svg";
import cancelImg from "../../images/searchPage/cancelImg.svg";
import { SF_HambakSnow } from "../../components/Text";

const SearchPage = () => {
  const [search, setSearch] = useState(false);
  const [keyword, setkeyword] = useState();
  const [data, setdata] = useState();
  const [dataLength, setdatalength] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setkeyword(e.target.value);
    console.log(getNames(keyword));
    getNames(keyword);
  };
  const getNames = (keyword) => {
    if (keyword === undefined) {
      setSearch(false);
      return;
    }
    http
      .get(
        `https://kj273456.pythonanywhere.com/dictionary/search/?keyword=${keyword}`
      )
      .then((res) => {
        setdatalength(res.data.length);
        setdata(res.data.data);
        console.log(data);
      })
      .catch((error) => {
        alert("검색 실패");
      });
  };
  const navigate = useNavigate();
  // 해당 사전 정의 모아보기로 이동하기 
  const movePage = (dicId) =>{
    // console.log(dicId);
    navigate(`/visitor/definition/${dicId}`);
  }
  useEffect(() => {
    if (keyword !== "") {
      getNames(keyword);
      setSearch(true);
    }
  }, []);

  return (
    <>
      <Background/>
      <Container>
        <Sidebar />
        <InputBox onChange={onSubmit}>
          <object type="image/svg+xml" data={searchImg} className="searchImg" />
          <Input
            placeholder="다른 사전을 검색해 보세요"
            value={keyword || ""}
            onChange={(e) => {
              setkeyword(e.target.value);
            }}
          />
          <object type="image/svg+xml" data={cancelImg} className="cancelImg" />
        </InputBox>

        {keyword === undefined ? null : (
          <ResultWrapper>
            {data === undefined ? (
              <div className="nullresult">
                <SF_HambakSnow>
                  {keyword}하다는 아직 만들어지지 않았습니다.
                </SF_HambakSnow>
              </div>
            ) : (
              data.map((ele, index) => {
                return (
                  <>
                    <div className="resultText" onClick={()=>{movePage(ele.id)}}>
                      <div className="searchResult">
                        <SF_HambakSnow>
                          {/* 사전 번호가 아닌 위에서부터 1번 */}
                          {index+1}번째 {keyword}하다
                        </SF_HambakSnow>
                      </div>
                      <div className="resultCount">
                        <SF_HambakSnow>
                          쌓인 문장 : {ele.stacked}개
                        </SF_HambakSnow>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </ResultWrapper>
        )}

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </>
  );
};

export default SearchPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
`
const ResultWrapper = styled.div`
  border: solid;
  margin-top: ${vh(16)};
  width: ${vw(301)};
  height: ${vh(10000)};
  background: #f2f2f2;
  border-radius: 5px;
  .nullresult {
    font-size: ${vw(14)};
    margin: 10px auto;
    color: #b8b8b8;
    width: fit-content;
  }
  .resultText {
    display: flex;
    width: ${vw(274)};
    height: ${vh(40)};
    margin: ${vh(13)} auto;
    background: #ffffff;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }
  .searchResult {
    font-weight: 800;
    font-size: ${vw(14)};
    width: 60%;
    align-items: center;
  }
  .resultCount {
    font-weight: 800;
    font-size: ${vw(12)};
    text-align: center;
    color: #b5b5b5;
  }
`;

const InputBox = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  width: ${vw(301)};
  height: ${vh(50)};
  display: flex;
  margin-top: ${vh(105)};
  .searchImg {
    margin-left: ${vw(16)};
    margin-right: ${vw(10)};
    width: ${vw(18)};
  }
  .cancelImg {
    margin-right: ${vw(10)};
    width: ${vw(12)};
  }
`;

const Input = styled.input`
  display: block;
  width: 80%;
  height: ${vh(50)};
  border: none;
  outline: none;
  font-family: "SF_HambakSnow";
  font-weight: 800;
  font-size: ${vw(16)};
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