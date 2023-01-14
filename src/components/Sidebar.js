import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useResize, vh, vw } from './SizeConvert';

//components
import { SF_HambakSnow, Simonetta } from './Text';

//images
import gathering from '../images/Sidebar/gathering.svg';
import home from '../images/Sidebar/home.svg';
import home_active from '../images/Sidebar/home_active.svg';
import gathering_active from '../images/Sidebar/gathering_active.svg';
import search from '../images/Sidebar/search.svg';
import search_active from '../images/Sidebar/search_active.svg';
import hamburger from '../images/Sidebar/sideBar.svg';
import makers from '../images/Sidebar/makers.svg';

const Sidebar = (props) => {
	const [show, setShow] = useState(false);
	const alertMessage = (e) => {
		setShow(!show);
		return { show };
	};
	// 사이드바 배경 스크롤 방지
	useEffect(() => {
		document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<>
			<HamburgerWrapper onClick={alertMessage}>
				<img src={hamburger} className="hamburger" />
			</HamburgerWrapper>
			{show ? (
				<BarWrapper>
					<LinkWrapper>
						<SF_HambakSnow>
							<object type="image/svg+xml" data={home} />
							{<Link to="/home">홈</Link>}
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<object type="image/svg+xml" data={gathering} />
							{<Link to="/">정의 모아보기</Link>}
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<object type="image/svg+xml" data={search} />
							<Link to="/search">사전 검색하기</Link>
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<object type="image/svg+xml" data={makers} />
							<Link to="/">만든이들</Link>
						</SF_HambakSnow>
					</LinkWrapper>
					<LogoutWrapper>
						<SF_HambakSnow>
							<Link to="/">로그아웃</Link>
						</SF_HambakSnow>
					</LogoutWrapper>
				</BarWrapper>
			) : (
				<></>
			)}
		</>
	);
};

export default Sidebar;

const LogoutWrapper = styled.div`
	width: fit-content;
	margin: ${vh(280)} auto;
`;

const HamburgerWrapper = styled.div`
	.hamburger {
		margin-top: ${vh(41)};
		margin-left: ${vw(0)};
		width: ${vw(24)};
		position: fixed;
		left: ${vw(50)};
		top: ${vh(21)};
	}
`;
const LinkWrapper = styled.div`
	width: fit-content;
	margin-left: ${vw(40)};
	margin-top: ${vh(60)};
	object {
		width: ${vw(20)};
		align-items: baseline;
	}
`;
const BarWrapper = styled.div`
	width: ${vw(200)};
	height: 80%;
	background: #ffffff;
	border-radius: 0px 5px 5px 0px;
	position: absolute;
	left: 0;
	margin-top: ${vh(100)};
	animation: LeftToRight 0.8s;
	@keyframes LeftToRight {
		0% {
			transform: translate3d(-100%, 0, 0);
		}
		to {
			transform: translateZ(0);
		}
	}
	a {
		margin-left: ${vw(13)};
		color: #818181;
		text-decoration: none;
		cursor: pointer;
	}
	a:hover {
		color: #fbb03b;
	}
	p {
		font-weight: 800;
		font-size: ${vw(14)};
		margin-bottom: ${vh(44)};
		display: flex;
	}
`;
