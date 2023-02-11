import styled from "styled-components";
import Loading from "../Loading";

const BlockModal = () =>{
    return(
        <>
        <Wrapper>
			<Loading/>
        </Wrapper>
        </>
    )
}

export default BlockModal;

const Wrapper = styled.div`
    width: 100vw;
	height: 100vh;

	position: absolute;
	display: flex;
    justify-content: center;
	align-items: center;
	z-index: 5;

    background: rgba(0, 0, 0, 0.5);
`

	
