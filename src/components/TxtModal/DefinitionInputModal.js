import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './DefinitionInputModal.css'
import { Link } from "react-router-dom";

//components
import { Pretendard,SF_HambakSnow } from "../Text";
import GreenBtn from "./GreenBtn";
//image
import Xbtn from '../../images/Modal/Xbtn.svg'
import infoCircleGrey from '../../images/Modal/infoCircleGrey.svg'
import infoCircleGreen from '../../images/Modal/infoCircleGreen.svg'

const XButton = ({onClick}) => {
  return (
    <XbtnBox onClick={onClick}>
        <img src={Xbtn}/>
    </XbtnBox>
  );
};

const DefinitionInputModal = props => {
  const { open, close, onClick } = props;
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
  const [name,setName] = useState('(이름)')
  const [consonant,setConsonant] = useState('ㄴ')
  const [example,setExample] = useState('(ex. 넉살이 좋은, 나눔을 잘하는, 노는 것을 좋아하는)')
  const [definition,setDefinition] = useState('')
  const [infoCircle, setInfoCircle] = useState(infoCircleGrey)

  const changeButton = (e) => {
    // e.preventDefault();
    setInput(e.target.value)
    console.log(input)

    if (input.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  };


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
                    padding:'0 15px'
                    }}
                    onChange={changeButton}
                    value={definition}
                    />
                    <InfoCircle/>
                    
                </InputBox>
              </main>
                <footer>
                {isInput ? (
                    <GreenBtn onClick={close}>
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

const InfoCircle = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-image: url(${infoCircleGrey});
  background-repeat: no-repeat ;
`