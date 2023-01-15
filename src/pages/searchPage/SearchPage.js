import styled, { css } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useResize, vh, vw } from '../../components/SizeConvert';

import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import background from '../../images/background.svg';
import searchImg from '../../images/searchPage/searchImg.svg';
import cancelImg from '../../images/searchPage/cancelImg.svg';
import { SF_HambakSnow } from '../../components/Text';

const SearchPage = () => {
	const [search, setSearch] = useState(false);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	//const preKeyWord = useAppSelector((state) => state.page.search);

	// const onSubmit = (e) => {
	// 	e.preventDefault();

	// 	if (keyword === '') {
	// 		alert('검색어를 입력해주세요!');
	// 	} else {
	// 		GetSearchBooth(keyword)
	// 			.then((res) => {
	// 				console.log(res);
	// 				setSearch(true);
	// 				dispatch(setSearchRedux({ search: keyword }));
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// };

	// useEffect(() => {
	// 	if (keyword !== '') {
	// 		GetSearchBooth(keyword)
	// 			.then((res) => {
	// 				console.log(res);
	// 				setSearch(true);
	// 				dispatch(setSearchRedux({ search: keyword }));
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// }, []);

	return (
		<>
			<Background>
				<Sidebar />
				<InputBox>
					<object type="image/svg+xml" data={searchImg} className="searchImg" />
					<Input
						placeholder="다른 사전을 검색해 보세요"
						/*value={keyword}
	onChange={(e) => setkeyword(e.target.value)}*/
					/>
					<object type="image/svg+xml" data={cancelImg} className="cancelImg" />
				</InputBox>

				<ResultWrapper>
					<div className="resultText">
						<div className="searchResult">
							<SF_HambakSnow>번째 춘향하다</SF_HambakSnow>
						</div>
						<div className="resultCount">
							<SF_HambakSnow>쌓인 문장 : 39개</SF_HambakSnow>
						</div>
					</div>
				</ResultWrapper>

				<FooterWrapper>
					<Footer />
				</FooterWrapper>
			</Background>
		</>
	);
};

export default SearchPage;

const ResultWrapper = styled.div`
	margin-top: ${vh(16)};
	width: ${vw(301)};
	height: ${vh(10000)};
	background: #f2f2f2;
	border-radius: 5px;
	.resultText {
		display: flex;
		width: ${vw(274)};
		height: ${vh(40)};
		margin: ${vh(13)} auto;
		background: #ffffff;
		border-radius: 5px;
		justify-content: center;
		align-items: center;
	}
	.searchResult {
		font-weight: 800;
		font-size: ${vw(14)};
		width: 60%;
		align-items: center;
	}
	.resultCount {
		font-weight: 800;
		font-size: ${vw(12)};
		text-align: center;
		color: #b5b5b5;
	}
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

const InputBox = styled.div`
	background-color: #ffffff;
	border-radius: 5px;
	width: ${vw(301)};
	height: ${vh(50)};
	display: flex;
	margin-top: ${vh(105)};
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
	height: ${vh(50)};
	border: none;
	outline: none;
	font-family: 'SF_HambakSnow';
	font-weight: 800;
	font-size: ${vw(16)};
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
