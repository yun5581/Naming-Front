import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { vw,vh } from "../../components/SizeConvert";
import axios from "axios";
// redux
import { useAppSelector } from "../../redux/store";
// data
import { makrData } from "../../_mock/customInfo";
// img 
import { FiAlertCircle } from "react-icons/fi"

const FirstPage3 = props =>{
    useEffect(()=>{
        ranConsonant();
    },[])
    const {visit_dictionaryId} = useAppSelector(state=>state.dictionary); 
    // 자음, 자음 예시 값 관리
    const [consonant,setConsonant] = useState('ㄴ')
    const [example,setExample] = useState('(ex. 넉살이 좋은, 나눔을 잘하는)')
    // 적은 정의 값 관리
    const [defi,setDefi] = useState('')
    // 자음 랜덤 배정
    const ranConsonant = () =>{
        const n = Math.floor(Math.random()*13)+1;
        const consonantIndex = makrData.filter((data) => data.id === n);
        const info = Object.values(consonantIndex)[0];
        setConsonant(Object.values(info)[1]);
        setExample(Object.values(info)[2]);
    }
    // 자음 검사 함수
   const checkInput = () =>{
    var isSame=false;
    if(defi[0]!=null){
        const input = getConstantVowel(defi[0]).f;
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
    // 버튼 변경 함수
    const changeButton = (e) => {
        var isInput=false;
        //자음이 일치하고, 공란이 아니면 버튼 활성화
        (defi != "")&&checkInput() ? isInput=true : isInput=false; 
        return isInput;
    };

     // 처음 정의 적기 
  const submitDefinition= () => {
    // 자음 int 값으로 보내기
    const consonantIndex = makrData.filter((data) => data.text === consonant);
    const idx = Object.values(consonantIndex)[0].id;
    // 정의 보내기
    axios.post(`https://kj273456.pythonanywhere.com/dictionary/${visit_dictionaryId}/post/`, {
      consonant: idx,
      contents: defi
      }).then((res)=>{
      })
      .catch((error)=>{
        alert("정의 작성 실패");
      });
     }
    return(
        <>
            <Container>
                <Title>첫번째 정의 작성은</Title>
                <ConWrapper>{consonant}</ConWrapper>
                <Text>
                    <div>으로 시작하는</div>
                    <div><p>{props.visit_dicName}하다의 정의</p>를 작성해주세요.</div>
                </Text>
                <Ex>
                    {example}
                </Ex>
                <InputBox>
                <input onChange={(e)=>{setDefi(e.target.value)}} value={defi}/>
                {checkInput() ? (
                <FiAlertCircle className="noneIcon"/>) 
                : (<FiAlertCircle className="alertIcon"/>)
                }
                </InputBox>
                {changeButton() ? (
                    <GreenBtn onClick={()=>{
                        props.setPage(4);
                        submitDefinition();
                    }}>완료</GreenBtn>
                 ):(
                <DisabledBtn>
                  완료
                </DisabledBtn>
                )}

            </Container>
        </>
    )
}

export default FirstPage3;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    width: 100%;
    height: 100%;
    font-family: var(--pre-font);
    justify-content: space-between;
    button{
        font-family: 'SF_HambakSnow';
        font-size: ${vw(16)};

        width: ${vw(222)};
        aspect-ratio: 5.5 / 1;

        border: none;
        border-radius: 5px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const Title = styled.div`
    width: 100%;
    font-family: var(--hb-font);
    font-size: ${vw(18)};
`
const ConWrapper = styled.div`
    color: var(--green);
    font-size: ${vw(80)};
    font-family: var(--hb-font);
`
const Text = styled.div`
    font-size: ${vw(13)};
    p{
        color: var(--green);
    }
`
const Ex = styled.div`
    font-size: ${vw(10)};
    margin: 3% 0;
`
const InputBox = styled.div`
    width: ${vw(222)};
    aspect-ratio: 5.5 / 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
    background-color: var(--gray0);
    margin: 5% 0;
    input{
        width: 80%;
        height: 100%;

        font-size: ${vw(13)};
        padding:0 5px 0 10px;
        outline: none;
        border: none;
        background-color: transparent;
    }
    .alertIcon{
        width: ${vw(20)};
        height: ${vw(18)};
        margin-right: 10px;
        color: var(--green);
    }
    .noneIcon{
        visibility: hidden;
    }
`
const GreenBtn = styled.button`
    color: var(--white);
    background-color: var(--green);
`
const DisabledBtn =styled.button`
    color: var(--white);
    background-color: var(--gray1);
`