import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {vw, vh} from "../../components/SizeConvert";
import clap from "../../images/authPage/clap.svg";
import { SF_HambakSnow } from "../Text";

const BlockModal = () =>{
    return(
        <>
        <Wrapper>
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
	z-index: 5;

    background: rgba(0, 0, 0, 0.5);

    /* animation: modal-show 0.1s; */
	/* @keyframes modal-show {
		from {
			opacity: 0;
			margin-top: -10px;
		}
		to {
			opacity: 1;
			margin-top: 0;
		}
	} */
`

	
