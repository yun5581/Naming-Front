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
  const { open, close, onClick, name } = props;
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
  const [consonant,setConsonant] = useState('ㄴ')
  const [example,setExample] = useState('(ex. 넉살이 좋은, 나눔을 잘하는, 노는 것을 좋아하는)')
  const [definition,setDefinition] = useState('')

  //redux
  const dispatch = useAppDispatch();
  const {visit_dictionaryId} = useAppSelector(state=>state.dictionary); 

  // 자음 랜덤 배정
  const ranConsonant = () =>{
    const n = Math.floor(Math.random()*15)
    setConsonant(consonants[n].con)
    setExample(consonants[n].ex)
  }
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

  // 처음 정의 적기 
  const submitDefinition= () => {
    // 자음 int 값으로 보내기
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    // 정의 보내기
    axios.post(`https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/post/`, {
      consonant: idx,
      contents: definition
      }).then((res)=>{
        setDefinition("");
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

const consonants = [
  {'con':'ㄱ','ex':"(ex. 관대한, 꼼꼼한, 개나리를 좋아하는)"},
  {'con':'ㄴ','ex':"(ex. 넉살이 좋은, 나눔을 잘하는, 노는 것을 좋아하는)"},
  {'con':'ㄷ','ex':"(ex. 다정한, 독창적인, 똑똑한, 다람쥐를 닮은)"},
  {'con':'ㄹ','ex':"(ex. 로망, 리코더를 잘 부는, 레몬색이 잘 어울리는)"},
  {'con':'ㅁ','ex':"(ex. 마음이 따뜻한, 멋진, 미식가, 믿을만한)"},
  {'con':'ㅂ','ex':"(ex. 배려를 잘하는, 박식한, 보라색을 좋아하는)"},
  {'con':'ㅅ','ex':"(ex. 사려깊은, 신중한, 생기있는, 수다쟁이)"},
  {'con':'ㅇ','ex':"(ex. 용감한, 영리한, 애정이 넘치는, 옷을 잘 입는)"},
  {'con':'ㅈ','ex':"(ex. 적극적인, 재치있는, 정확한 계산을 잘하는)"},
  {'con':'ㅊ','ex':"(ex. 천진난만한, 초록색을 좋아하는, 창의적인)"},
  {'con':'ㅋ','ex':"(ex. 쾌활한, 쿠키를 잘 만드는)"},
  {'con':'ㅌ','ex':"(ex. 타고난, 특이한, 태권도를 잘하는)"},
  {'con':'ㅍ','ex':"(ex. 편견이 없는, 폼생폼사, 피자를 좋아하는)"},
  {'con':'ㅎ','ex':"(ex. 활동적인, 합리적인, 하늘색이 잘 어울리는)"},
]

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