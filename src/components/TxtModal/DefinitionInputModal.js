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
import { vw,vh } from "../SizeConvert";
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
      if(consonant==null||consonant==""){
        input == "ㄱ" ? isSame=true : isSame=false;
      }
      else{
        input == consonant ? isSame=true : isSame=false;
      }
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
    var idx;
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    if(consonant==null||consonant=="") idx = 1;
    else idx = Object.values(consonantIndex)[0].id;
    // 자음 int 값으로 보내기
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
              size={vw(100)}
              color= 'var(--green)'
              height={vh(80)}
              style={{marginBottom:'0px'}}
              >{consonant==null||consonant==""?"ㄱ":consonant}</SF_HambakSnow>
                </header>
                <Pretendard
                weight='500'
                size={vw(14)}
                >
            <span>으로 시작하는 </span>
            <span style={{color:'var(--green)'}}> {name}하다의 정의</span>
            <span>를 작성해 주세요.</span>
            </Pretendard>
            <Pretendard
            weight='300'
            size={vw(10)}
            height = '12px'
            style={{margin:'8px 0 18px'}}>
                  {example==null||example==""?makrData[0].ex:example}
                </Pretendard>
                <InputBox>
                  <input placeholder="내용을 입력해주세요" style={{
                    width: '100%',
                    backgroundColor:'transparent', 
                    color:'var(--black)',
                    border:'none',
                    fontFamiliy:'Pretendard',
                    fontSize:vw(16),
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
 width: ${vw(316)};
  aspect-ratio: 6.8 / 1;
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
  font-size: ${vw(16)};

  width: ${vw(316)};
  aspect-ratio: 6.8 / 1;

  border: none;
  border-radius: 5px;

  align-items: center;
  text-align: center;
`;
