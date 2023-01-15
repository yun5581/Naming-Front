// vw, vh 연습용 코드
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { vw, vh } from '../../components/SizeConvert';
import Sidebar from '../../components/Sidebar';
import { SF_HambakSnow, Simonetta } from '../../components/Text';

//images
import background from '../../images/background.svg';
import dictionary from '../../images/landingPage/dictionary.svg';
import Footer from '../../components/Footer';

const DefinitionPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<Background>
				<Sidebar />
				<NumText>
					<SF_HambakSnow>총 20개의 문장이 쌓여있어요!</SF_HambakSnow>
				</NumText>
				<DicBook>
					<DicSidePage></DicSidePage>
					<DicPage>
						<TitleBox>
							<Title>이름하다</Title>
							<EditBtn>수정</EditBtn>
						</TitleBox>
						<ContentBox>
							<div className="content">
								<div className="countNum">3</div>
								<div className="comment">넌 재미없어</div>
								<div className="like"></div>
							</div>
						</ContentBox>
					</DicPage>
					<DicIndexWrapper></DicIndexWrapper>
				</DicBook>

				<FooterWrapper>
					<Footer />
				</FooterWrapper>
			</Background>
		</>
	);
};

export default DefinitionPage;

const ContentBox = styled.div`
	overflow-y: scroll;
	.content {
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		height: ${vh(33)};
		background-color: red;
		margin-bottom: ${vw(16)};
		display: flex;
		align-items: center;
	}
`;

const EditBtn = styled.div`
	font-weight: 400;
	font-size: ${vw(12)};
	color: #818181;
`;
const Title = styled.div`
	color: #2b787d;
	font-weight: 900;
	font-size: ${vw(20)};
	text-decoration-line: underline;
`;
const TitleBox = styled.div`
	display: flex;
	margin-bottom: ${vh(29)};
	align-items: baseline;
	justify-content: space-between;
`;
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
`;

const NumText = styled.div`
	color: white;
	font-weight: 800;
	font-size: ${vw(18)};
	margin-top: ${vh(65)};
	margin-left: ${vw(25)};
`;
const DicBook = styled.div`
	display: flex;
`;
const DicIndexWrapper = styled.div`
	background-color: red;
	height: ${vh(400)};
	width: ${vw(55)};
	margin-top: ${vh(40)};
`;
const DicSidePage = styled.div`
	height: ${vh(400)};
	width: ${vw(25)};
	margin-top: ${vh(40)};
	background-color: white;
	border-right: 2px solid #ecebe8;
	box-shadow: 0px 0px 9px #848380;
`;
const DicPage = styled.div`
	background-color: white;
	width: ${vw(255)};
	height: ${vh(400)};
	margin-top: ${vh(40)};
	padding: ${vw(16)};
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
