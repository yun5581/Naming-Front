import styled from "styled-components";
import { SF_HambakSnow } from "../Text";
import { vw, useResize } from "../SizeConvert";
const Title = () =>{
    useResize();
    return(
        <>
            <Wrapper>
                <SF_HambakSnow>
                    <p style={{fontSize: vw(26)}}>이름하여 이름하다</p>
                    <hr style={{marginTop: "8px"}}/>
                    <div style={{fontSize: vw(13), marginTop:"20px"}}>
                        친구들이 정의하는 '나'로
                        <br/>
                        나만의 사전을 채워보세요
                    </div>
                </SF_HambakSnow>
            </Wrapper>
        </>
    )
}

export default Title;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 54px;
    text-align: center;
    color: var(--white);
`
  