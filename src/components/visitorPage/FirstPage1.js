import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { vw,vh } from "../../components/SizeConvert";

const FirstPage1 = props =>{
    return(
        <>
            <Container>
                <Title>반갑습니다.<div>{props.nickname}님!</div></Title>
                <Text>
                    <TextTop>
                        <div><p>이름하여 이름하다</p>는</div>
                        <div>주변인들이 적어주는 정의로</div>
                        <div>본인의 사전을 채워가는 서비스 입니다.</div>
                    </TextTop>
                    <TextBottom>
                        <div>각 자음별로 시작하는 사전 주인에 대한</div>
                        <div><p>솔직하고 재치있는 단어와 문장</p>을</div>
                        채워주시길 바랍니다.
                    </TextBottom>
                </Text>
              <NextBtn onClick={()=>{props.setPage(2)}}>다음</NextBtn>
            </Container>
        </>
    )
}

export default FirstPage1;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display: flex;
        justify-content: center;
    }
    font-family: var(--pre-font);
`
const Title = styled.div`
    width: 100%;
    font-family: var(--hb-font);
    font-size: ${vw(18)};
    div{
        color: var(--green);
        margin-left: 6px;
    }
`
const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    line-height:${vw(20)};
    font-size: ${vw(14)};
    p{
        color: var(--green);
    }
`
const TextTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15%;
`
const TextBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7%;
`
const NextBtn = styled.div`
    margin-top: 15%;
    color: var(--white);
    background-color: var(--green);
    font-family: 'SF_HambakSnow';
    font-size: ${vw(16)};

    width: ${vw(222)};
    aspect-ratio: 5.5 / 1;

    border: none;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`