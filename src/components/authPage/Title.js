import styled from "styled-components";
import { SF_HambakSnow } from "../Text";
import { vw, vh, useResize } from "../SizeConvert";
const Title = () =>{
    useResize();
    return(
        <>
            <Wrapper>
                <SF_HambakSnow>
                    <p style={{fontSize: vw(26)}}>이름하여 이름하다</p>
                    <hr style={{marginTop: vh(8)}}/>
                    <div style={{fontSize: vw(13), marginTop:vh(20)}}>
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
    margin-top:${vh(54)};
    text-align: center;
    color: var(--white);
`
  