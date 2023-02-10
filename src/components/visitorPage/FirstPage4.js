import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { vw,vh } from "../SizeConvert";
//redux
import { useAppSelector } from "../../redux/store";
// data
import { makrData } from "../../_mock/customInfo";
// img 
import { FiAlertCircle } from "react-icons/fi"


const FirstPage4 = props =>{
    // 방문 사전 아이디, 방문 사전 유저 아이디 가져오기
    const {visit_dictionaryId} = useAppSelector(state=>state.dictionary); 
    const {visit_userId} = useAppSelector(state=>state.visitor); 
    return(
        <>
            <Container>
            <Emoji>👏🏻</Emoji>
            <Text>
                <div className="title">작성이 완료되었습니다!</div>
                <div className="info">
                {props.visit_dicName}하다 사전을 둘러보며 정의를 추가<br/>
                하거나 나만의 사전을 만들어보세요. 
                </div>
            </Text>
            <BtnWrapper>
                <BrowseBtn> 
                    <Link to={`/${visit_userId}/visitor/definition/${visit_dictionaryId}`}>
                        {props.visit_dicName}하다 사전 둘러보기
                    </Link>
                </BrowseBtn>
                <GreenBtn>
                    <Link to='/register'>
                        내 사전 만들러 가기
                    </Link>
                </GreenBtn>
            </BtnWrapper>
            </Container>
        </>
    )
}

export default FirstPage4;

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
    font-family: var(--hb-font);
`
const Emoji = styled.div`
    margin: 10% 0;
    font-size: ${vw(24)};
`
const Text = styled.div`
    .title{
        font-size: ${vw(17)};
    }
    .info{
        margin-top: 3%;
        text-align: center;
        font-family: var(--pre-font);
        font-size: ${vw(11)};
        line-height: ${vw(16)};
    }
`
const BtnWrapper =styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12%;
    button{
        width: ${vw(222)};
        aspect-ratio: 5.5 / 1;
        border-radius: 5px; 
        font-size: ${vw(14)};
        font-family: var(--hb-font);  
    }
    a{
        text-decoration: none;
    }
`
const BrowseBtn = styled.button`
    border: 1px solid var(--green);
    background-color: transparent;
    a{
        color: var(--green);
    }
`
const GreenBtn = styled.button`
    margin-top: 5%;
    background-color: var(--green);
    border: none;
    a{
        color: var(--white);
    }
`