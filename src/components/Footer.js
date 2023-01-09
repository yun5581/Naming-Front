import { Simonetta } from "./Text"
import { vw, vh } from "../components/SizeConvert";
import styled from "styled-components";

const Footer = () =>{
    return (
        <>
            <Simonetta style={{
                fontSize: vw(8),
                color: "#FFFFFF",
                textAlign: 'center',
               }}>ⓒ 2022. likelion_ewha All rights reserved.</Simonetta>
        </>
    )
}

export default Footer;