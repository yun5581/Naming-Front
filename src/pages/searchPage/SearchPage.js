import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResize, vh, vw } from '../../components/SizeConvert';

import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import background from '../../images/background.svg';
import searchImg from '../../images/searchPage/searchImg.svg';
import cancelImg from '../../images/searchPage/cancelImg.svg';

// const onSubmit = (e) => {
// 	e.preventDefault();

// 	if (keyword === '') {
// 		alert('검색어를 입력해주세요!');
// 	} else {
// 		GetSearchBooth(keyword)
// 			.then((res) => {
// 				console.log(res);
// 				setSearch(true);
// 				setBooths(res.data.data);
// 				dispatch(setSearchRedux({ search: keyword }));
// 			})
// 			.catch((err) => console.log(err));
// 	}
// };

const SearchPage = () => {
	return (
		<>
			<Background>
				<Sidebar />
				<InputBox>
					<object type="image/svg+xml" data={searchImg} className="searchImg" />
					<Input placeholder="다른 사전을 검색해 보세요" />
					<object type="image/svg+xml" data={cancelImg} className="cancelImg" />
				</InputBox>
				<FooterWrapper>
					<Footer />
				</FooterWrapper>
			</Background>
		</>
	);
};

export default SearchPage;

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

const InputBox = styled.div`
	background-color: #ffffff;
	border-radius: 5px;
	width: ${vw(301)};
	height: ${vh(50)};
	display: flex;
	margin-top: ${vw(100)};
	.searchImg {
		margin-left: ${vw(16)};
		margin-right: ${vw(10)};
		width: ${vw(18)};
	}
	.cancelImg {
		margin-right: ${vw(10)};
		width: ${vw(12)};
	}
`;

const Input = styled.input`
	display: block;
	width: 80%;
	height: 100%;
	border: none;
	outline: none;
	font-family: 'SF_HambakSnow';
	font-weight: 800;
	font-size: 16px;
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
