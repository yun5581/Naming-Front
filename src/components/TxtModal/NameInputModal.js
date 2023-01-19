import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './NameInputModal.css'
import { Link } from "react-router-dom";

//components
import { Pretendard,SF_HambakSnow } from "../Text";
import GreenBtn from "./GreenBtn";
//image
import Xbtn from '../../images/Modal/Xbtn.svg'

const XButton = ({onClick}) => {
  return (
    <XbtnBox onClick={onClick}>
        <img src={Xbtn}/>
    </XbtnBox>
  );
};

const NameInputModal = props => {
  const { open, close, header, subtext, maintext, onClick } = props;
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
  const [name,setName] = useState('')

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
                  <SF_HambakSnow size="24px" color="var(--green)">
                    {header}
                  </SF_HambakSnow>
                </header>
                <Pretendard
                  size="14px"
                  weight="400"
                  color="var(--black)"
                  style={{ marginTop: "18px", marginBottom:'25px',lineHeight:'18px' }}
                >
                  {maintext}
                </Pretendard>
                <Pretendard
                  size="15px"
                  weight="400"
                  color="var(--black)"
                  // style={{ marginTop: "8px" }}
                >
                  {subtext}
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
                    value={name}
                    />
                </InputBox>
              </main>
                <footer>
                {isInput ? (
                  <Link to='/visitorfirst'>
                    <GreenBtn onClick={onClick}>
                        완료
                    </GreenBtn>
                  </Link>
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

export default NameInputModal;

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
