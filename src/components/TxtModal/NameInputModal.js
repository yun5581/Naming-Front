import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './NameInputModal.css'
import { useNavigate } from "react-router-dom";
//redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setVisitor } from "../../redux/visitorSlice";
//components
import { Pretendard,SF_HambakSnow } from "../Text";
import GreenBtn from "./GreenBtn";
//image
import Xbtn from '../../images/Modal/Xbtn.svg'
import axios from "axios";

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

  const [name,setName] = useState('');

  // 여기서부터 코드 수정 + 추가 코드 작성, 포맷팅은 윤이 편한대로 하셔요!
  // state로 관리하는 경우 1개씩 밀려서 코드를 수정함
  const changeButton = (e) => {
    var isInput=false;
    name != "" ? isInput=true : isInput=false;
    return isInput;
  };

  // 페이지 라우팅 navigate
  const navigate = useNavigate();
  // visitor redux 
  const dispatch = useAppDispatch();
  const {nickname} = useAppSelector(state=>state.visitor);  // nickname 저장되었는지 확인용 코드
  const {dictionaryId} = useAppSelector(state=>state.dictionary);  // 써줄 사전 아이디

  // 작성자 이름 전달 함수
  const submitName = () => {
    // 리덕스에 작성자 이름 저장 
    dispatch(setVisitor({
      nickname: name
    }));
    // 충돌 날까봐 api 연결 여기다 바로했어요 ~ 
    axios.post(`https://kj273456.pythonanywhere.com/dictionary/${dictionaryId}/people`, {
      nickname: nickname
      }).then((res)=>{
          console.log(res);
          navigate("/visitorfirst");
      })
      .catch((error)=>{
        console.log(error);
        alert("작성자 이름 저장 실패");
      })
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
                  <input placeholder="이름을 입력해주세요" style={{
                    width: '100%',
                    backgroundColor:'transparent', 
                    color:'var(--black)',
                    border:'none',
                    fontFamiliy:'Pretendard',
                    fontSize:'16px',
                    padding:'0 15px'
                    }}
                    onChange={(e)=>{setName(e.target.value)}}
                    value={name}
                    />
                </InputBox>
              </main>
                <footer>
                {changeButton() ? (
                  <GreenBtn onClick={()=>{submitName()}}>
                    완료
                  </GreenBtn>
                  /* Link 대신 이름 값 전달 성공하면 페이지 이동하는걸로 변경 */
                  // <Link to='/visitorfirst'>
                  // </Link>
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
  //align-items: center; input창이랑 div 크기 맞추려고 주석 처리함
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