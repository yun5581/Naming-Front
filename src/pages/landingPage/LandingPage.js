import React, {useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
//components
import { SF_HambakSnow, Simonetta } from "../../components/Text";
//images
import background from "../../images/background.svg";

const LandingPage = () => {
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

    return (
        <>
            <Background>
                <SF_HambakSnow>
                    <Title>
                        이름하여 이름하다
                    </Title>
                </SF_HambakSnow>
            </Background>
        </>
    );
};

const Background = styled.div`
    width: 100%;
    height: 100vh;

    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
`
const Title = styled.div`
    font-family: 'SF_HambakSnow';
`
export default LandingPage;