import styled from "styled-components";
import Loading from "../Loading";
import React from "react";
import {PropagateLoader} from "react-spinners";
import { vw } from "../SizeConvert";

const LoadingModal = () =>{
    const Loading = () =>{
        return(
            <div>
                <PropagateLoader
                    color= "#BABABA"
                    // loading={loading}
                    cssOverride={override}
                    size="10px"
                />
            </div>
        )
    }
    const override = {
        display: "flex",
        borderColor: "#2B787D",
        textAlign:"center",
        position:"relative",
        zIndex:"10",
        speedMultiplier: 5,
    };
    return(
        <>
        <Wrapper>
            <div>책장에서 사전을 찾는 중</div>
			<Loading/>
        </Wrapper>
        </>
    )
}



export default LoadingModal;

const Wrapper = styled.div`
    width: 100vw;
	height: 100vh;

	position: absolute;
	display: flex;
    flex-direction: column;
    justify-content: center;
	align-items: center;
	z-index: 5;
    div{
        font-family: var(--hb-font);
        font-size: ${vw(18)};
        color: var(--white);
        margin-top: 30px;
    }
`

	
