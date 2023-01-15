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
			<Sidebar />
			<Background>
				<object type="image/svg+xml" data={dictionary} className="dic" />
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

const Background = styled.div`
	width: 100%;
	height: 100vh;
	overflow: scroll;

	display: flex;
	flex-direction: column;
	align-items: center;

	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
	.dic {
		width: ${vw(324)};
		height: ${vh(468)};
		margin: ${vh(100)} 0 ${vh(32)} 0;
	}
`;

const AlertMSG = styled.div`
	font-weight: 800;
	font-size: 12px;
	color: var(--white);
	margin-top: ${vh(20)};
	height: 15px;
`;

const ButtonWrapper = styled.button`
	width: ${vw(272)};
	height: ${vh(46)};
	background: #ffffff;
	border-radius: 5px;
	margin-top: ${vh(15)};
`;

const Button = styled.div`
	height: ${vh(46)};
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

const FooterWrapper = styled.div`
	height: 100vh;
	margin-top: 30px;
	padding-bottom: 30px;
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;
export default HomePage;
