import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { vw,vh } from "../../components/SizeConvert";

const FirstPage2 = props =>{
    return(
        <>
            <Container>
                <Title>첫번째 정의 작성은</Title>
                <Text>
                    <TextTop>
                        <div>자음이<p>랜덤으로 배정됩니다!</p></div>
                        <div style={{marginTop: "15%"}}></div>
                        <div>첫 번째 정의 작성 이후</div>
                        <div><p style={{marginRight: "5px"}}>{props.visit_dicName}</p>님의 사전을 둘러보며</div>
                        <div>자유롭게 작성할 수 있습니다.</div>
                    </TextTop>
                    <TextBottom>
                        <div>작성한 정의는<p>수정할 수 없으니</p></div>
                        <div>신중하게 작성해 주시기 바랍니다.</div>
                    </TextBottom>
                </Text>
                <NextBtn onClick={()=>{props.setPage(3)}}>다음</NextBtn>
            </Container>
        </>
    )
}

export default FirstPage2;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        display: flex;
        justify-content: center;
    }
    font-family: var(--pre-font);
    width: 100%;
    height: 100%;
    justify-content: space-between;
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
    /* margin-top: 5%;  */
    p{
        margin-left: 5px;
    }
`
const TextBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15%;
    p{
        margin-left: 5px;
    }
`
const NextBtn = styled.div`
    /* margin-top: 15%; */
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
    bottom: 0;
`