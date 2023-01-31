import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {vw, vh} from "../../components/SizeConvert";
import clap from "../../images/authPage/clap.svg";
import { SF_HambakSnow } from "../Text";

const RegisterModal = (props) =>{
    return(
        <>
        <Wrapper onClick={()=>{props.setModal(false)}}>
            <Modal>
                <object type="image/svg+xml" data={clap} className="clap"/>
                <NameWrapper>
                    <div>{props.number}</div>번째
                    <div style={{marginLeft: vw(4)}}>{props.name}</div>(이)가 되셨군요!
                </NameWrapper>
                <DeleteModalBtn onClick={()=> {
                        window.location.reload();
                        window.location.href = "https://naming-front.vercel.app/custom"; //url 도메인 수정 필요
                }}>
                    내 사전 만들러 가기
				</DeleteModalBtn>
            </Modal>
        </Wrapper>
        </>
    )
}

export default RegisterModal;

const Wrapper = styled.div`
    width: 100vw;
	height: 100vh;

	position: absolute;
	display: flex;
    justify-content: center;
	z-index: 5;

    background: rgba(0, 0, 0, 0.5);

    animation: modal-show 0.5s;
	@keyframes modal-show {
		from {
			opacity: 0;
			margin-top: -10px;
		}
		to {
			opacity: 1;
			margin-top: 0;
		}
	}
`

const Modal = styled.div`
    width: ${vw(303)};
    height: calc(${vw(303)}*0.7);
    margin-top: ${vh(200)};

    background: #ffffff;
    border-radius: ${vw(5)};

	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    object{
        width: ${vw(24)};
        height: ${vw(24)};
    }
`

const NameWrapper = styled.div`
    display: flex;
    font-family: var(--hb-font);
    font-size: ${vw(20)};
    div{
        color: var(--green);
   }
`
const DeleteModalBtn = styled.button`
    width: ${vw(270)};
    aspect-ratio: 5.8 / 1;

	background: var(--green);
	border-radius: ${vw(5)};
	border-style: none;

    font-size: ${vw(14)};
    font-family: var(--hb-font);
    
    color: var(--white);
`
	
