import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './DefinitionInputModal.css'
import { Link } from "react-router-dom";
import axios from "axios";
//redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
//data
import { makrData } from "../../_mock/customInfo";
//components
import { Pretendard,SF_HambakSnow } from "../Text";
import GreenBtn from "./GreenBtn";
//image
import Xbtn from '../../images/Modal/Xbtn.svg'
// import infoCircleGrey from '../../images/Modal/infoCircleGrey.svg'
// import infoCircleGreen from '../../images/Modal/infoCircleGreen.svg'
import { FiAlertCircle } from "react-icons/fi"

const XButton = ({onClick}) => {
  return (
    <XbtnBox onClick={onClick}>
        <img src={Xbtn}/>
    </XbtnBox>
  );
};

const DefinitionInputModal = props => {
  const { open, close, onClick, name} = props;
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const [input,setInput] = useState(0)
  const [isInput, setIsInput] = useState(false)
  const consonant = sessionStorage.getItem("selectMark");
  const example = sessionStorage.getItem("selectEx");
  const [definition,setDefinition] = useState('')

  //redux
  const dispatch = useAppDispatch();
  const {visit_dictionaryId} = useAppSelector(state=>state.dictionary); 

  const changeButton = (e) => {
    var isInput=false;
    //자음이 일치하고, 공란이 아니면 버튼 활성화
    (definition != "")&&checkInput() ? isInput=true : isInput=false; 
    return isInput;
  };
   // 자음 검사 함수
   const checkInput = () =>{
    var isSame=false;
    if(definition[0]!=null){
      const input = getConstantVowel(definition[0]).f;
      input == consonant ? isSame=true : isSame=false;
    }
    else isSame=false;
    return isSame;
  }
  // 한글 첫 글자 분리 함수
  function getConstantVowel(kor) {
      const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
                'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
                'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
      const ga = 44032;
      let uni = kor.charCodeAt(0);
      uni = uni - ga;
      let fn = parseInt(uni / 588);
      return {
          f: f[fn]
      };
  }

 // 정의 보내기
  const submitDefinition= () => {
    // 자음 int 값으로 보내기
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    axios.post(`https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/post/`, {
      consonant: idx,
      contents: definition
      }).then((res)=>{
        setDefinition("");
        window.location.reload();
      })
      .catch((error)=>{
        alert("정의 작성 실패");
      });
  }

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <close style={{'display':'flex','justifyContent':'flex-end','margin':'7px'}}>
              <XButton onClick={close} />
            </close>
              <main>
                <header>
                <SF_HambakSnow
              weight='800'
              size='100px'
              color= 'var(--green)'
              height='80px'
              style={{marginBottom:'0px'}}
              >{consonant}</SF_HambakSnow>
                </header>
                <Pretendard
                weight='500'
                size='13px'
                >
            <span> 으로 시작하는 </span>
            <span style={{color:'var(--green)'}}> {name}하다의 정의</span>
            <span>를 작성해 주세요.</span>
            </Pretendard>
            <Pretendard
            weight='300'
            size='10px'
            height = '12px'
            style={{margin:'8px 0 18px'}}>
                  {example}
                </Pretendard>
                <InputBox>
                  <input placeholder="내용을 입력해주세요" style={{
                    width: '100%',
                    backgroundColor:'transparent', 
                    color:'var(--black)',
                    border:'none',
                    fontFamiliy:'Pretendard',
                    fontSize:'16px',
                    padding:'0 15px',
                    outline: 'none'
                    }}
                    onChange={(e)=>{
                      setDefinition(e.target.value);
                    }}
                    value={definition}
                    />
                    {/* <InfoCircle/> */}
                    {checkInput() ? (
                      <FiAlertCircle className="noneIcon"/>) 
                      : (<FiAlertCircle className="alertIcon"/>)
                    }
                </InputBox>
              </main>
                <footer>
                {changeButton() ? (
                    <GreenBtn onClick={()=>{
                      submitDefinition();
                      close();
                      }}>
                        완료
                    </GreenBtn>
                 ):(
                  <DisabledBtn>
                  완료
                </DisabledBtn>
                )}
                </footer>
          </section>
        ):(null)}
      </div>
    </>
  );
};

export default DefinitionInputModal;

const XbtnBox = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  background-color: transparent;
`
const InputBox = styled.div` 
  width: 316.88px;
  height: 46px;
  border-radius: 5px;
  background-color: var(--gray0);

  display: flex;
  align-items: center;
  margin: 0 auto;
  .alertIcon{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: var(--gray1);
  }
  .noneIcon{
    visibility: hidden;
  }
`

const DisabledBtn = styled.button`
  color: var(--white);
  background-color: var(--gray1);
  font-family: 'SF_HambakSnow';
  font-size: 16px;

  width: 316.88px;
  height: 46px;

  border: none;
  border-radius: 5px;

  align-items: center;
  text-align: center;
`;

// const InfoCircle = styled.div`
//   width: 20px;
//   height: 20px;
//   margin-right: 10px;
//   background-image: url(${infoCircleGrey});
//   background-repeat: no-repeat ;
// `