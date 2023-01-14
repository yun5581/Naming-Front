import React, { useEffect } from 'react';
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

const Sidebar = (props) => {
	const DeleteSideBar = () => {
		console.log('11');
		props.setSideBar(false);
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
		<BarWrapper>
			<hamburgerWrapper>
				<object type="image/svg+xml" data={hamburger} className="hamburger" />
			</hamburgerWrapper>

			{
				<Bar onClick={DeleteSideBar}>
					<LinkWrapper>
						<SF_HambakSnow>
							<img src={home} />
							{<Link to="/">홈</Link>}
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<img src={gathering} />
							{<Link to="/">정의 모아보기</Link>}
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<img src={search} />
							<Link to="/">사전 검색하기</Link>
						</SF_HambakSnow>
						<SF_HambakSnow style={{ marginRight: '32px' }}>
							<img src={gathering} />
							<Link to="/">만든이들</Link>
						</SF_HambakSnow>
					</LinkWrapper>
				</Bar>
			}
		</BarWrapper>
	);
};

export default Sidebar;

const BarWrapper = styled.div`
	width: 100%;
	height: 812px;
	position: absolute;
	z-index: 9;
	top: 0;
	left: 0;
`;
const hamburgerWrapper = styled.div`
	background-color: red;
	.hamburger {
		margin-top: ${vh(41)};
		margin-left: ${vh(50)};
		width: ${vh(24)};
	}
`;

const Bar = styled.div`
	width: 50%;
	height: ${vh(600)};
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 10;
	top: ${vh(100)};
	left: 0;
	background: #ffffff;
	border-radius: 0px 5px 5px 0px;

	animation: LeftToRight 0.8s;
	@keyframes LeftToRight {
		0% {
			transform: translate3d(-100%, 0, 0);
		}
		to {
			transform: translateZ(0);
		}
	}
`;

const LinkWrapper = styled.div`
	width: 165px;
	height: 330px;
	margin-top: 40px;
	justify-content: space-between;
	p {
		width: 100px;
		height: 50px;
		display: flex;
		align-items: center;
		font-weight: 800;
		font-size: 14px;
		text-align: center;
		margin-left: 20px;
		margin-top: 10px;
	}
	a {
		position: absolute;
		z-index: 2;
		margin-left: 20px;
		color: #004628;
		text-decoration: none;
	}
	a:hover {
		color: #fbb03b;
	}
	img {
		position: absolute;
		z-index: 1;
		width: 20px;
	}
`;
