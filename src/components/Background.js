import styled from "styled-components";
import StarBackground from "./StarBackground";
import background from "../images/background.svg";

const Background = () =>{
    return(
        <>
            <Wrapper>
                <StarBackground/>
            </Wrapper>
        </>
    )
}

export default Background;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 0;
    background-color: #2c303a;
    background-repeat: no-repeat;
    background-size: cover;
`