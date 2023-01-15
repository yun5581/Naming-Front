// vw, vh 연습용 코드
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { useResize, vh, vw } from '../../components/SizeConvert';

//components
import { SF_HambakSnow, Simonetta } from '../../components/Text';
import Sidebar from '../../components/Sidebar';
//images
import getLink from '../../images/homePage/share.svg';
import background from '../../images/background.svg';
import dictionary from '../../images/landingPage/dictionary.svg';
import Footer from '../../components/Footer';

const HomePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [show, setShow] = useState(false);
	const alertMessage = (e) => {
		setShow(true);
		return { show };
	};

	useResize();
	return (
		<>
			<Background>
				<Sidebar />
				<Container>
					<object type="image/svg+xml" data={dictionary} className="dic" />
				</Container>
				<ButtonWrapper onClick={alertMessage}>
					<Button>
						<object type="image/svg+xml" data={getLink} className="getLink" />
						<SF_HambakSnow>내 사전 링크 복사하기</SF_HambakSnow>
					</Button>
				</ButtonWrapper>
				<AlertMSG>
					{show ? (
						<SF_HambakSnow>
							사전 링크가 클립보드에 복사되었습니다.
						</SF_HambakSnow>
					) : (
						<SF_HambakSnow> </SF_HambakSnow>
					)}
				</AlertMSG>
				<FooterWrapper>
					<Footer />
				</FooterWrapper>
			</Background>
		</>
	);
};

const AlertMSG = styled.div`
	font-weight: 800;
	font-size: 12px;
	color: var(--white);
	margin-top: ${vh(20)};
	height: 15px;
`;

const ButtonWrapper = styled.button`
	width: 70%;
	height: 46px;
	max-width: 250px;
	background: #ffffff;
	border-radius: 5px;
	margin-top: ${vh(15)};
`;

const Button = styled.div`
	width: fit-content;
	margin: auto;
	color: var(--blue);
	font-weight: 800;
	font-size: 14px;
	display: flex;
	align-items: center;
	.getLink {
		width: 20px;
		height: 20px;
		margin-right: 7px;
	}
`;

const Background = styled.div`
	width: 100%;
	height: 100vh;

	display: flex;
	flex-direction: column;
	align-items: center;

	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
`;
const Container = styled.div`
	margin-top: 90px;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.dic {
		width: 90%;
	}
`;

const FooterWrapper = styled.div`
	display: flex;
	margin-top: ${vh(60)};
`;
export default HomePage;
