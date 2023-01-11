import styled from "styled-components";
import { vw } from "../components/SizeConvert";


const Footer = () =>{
    return (
        <>
            <Wrapper>ⓒ 2022. likelion_ewha All rights reserved.</Wrapper>
        </>
    )
}

export default Footer;

const Wrapper = styled.div`
    color: var(--white);
    font-size: ${vw(8)};
    font-family: var(--sm-font);
`