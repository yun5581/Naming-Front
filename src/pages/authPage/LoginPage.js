import styled from "styled-components";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { vw } from "../../components/SizeConvert";
//components
import Footer from "../../components/Footer";
import Title from "../../components/authPage/Title";
import Background from "../../components/Background";
import BlockModal from "../../components/authPage/BlockModal";
// api, 유저 정보
import { GetUser } from "../../api/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setNth, setUser } from "../../redux/userSlice";
import { setDictionaryID } from "../../redux/dictionarySlice";
import axios from "axios";

const LoginPage = () =>{
    const navigate = useNavigate();
    // 유저 리덕스 
    const dispatch =useAppDispatch();
    const {ID, PW} = useAppSelector(state=>state.user);
    const { dictionaryId } = useAppSelector((state) => state.dictionary);

    // 로그인 정보관리
    const [id, setID] = useState(ID);
    const [password, setPW] = useState(PW);

    // 모달 관리
    const[block, setBlock] = useState(false);

    // 로그인 함수
    const login = async() =>{
        setBlock(true);
        try{    
            await GetUser(id, password)
            .then((res)=>{
                if(res.message=="로그인 성공"){
                    window.localStorage.setItem("token", JSON.stringify(res.data.access_token));
                    dispatch(setUser({
                        userId: res.data.user_id,
                        name: res.data.firstName,
                        ID: id,
                        PW: password
                    }));
                    // n번째 지은이 정보 받기
                    axios.get(`https://kj273456.pythonanywhere.com/accounts/number/${res.data.user_id}/`)
                    .then((res)=>{
                        dispatch(setNth({nth: res.data.data.userNumber+1}));
                    })
                    // 사전 아이디 받기
                    axios.get(`https://kj273456.pythonanywhere.com/dictionary/id/${res.data.user_id}/`)
                    .then((res)=>{
                        dispatch(setDictionaryID({dictionaryId: res.data.data.id}));
                    }).then(()=>{  
                        navigate("/home");
                        window.location.reload();
                    }).catch((error)=>{
                        alert("사전 정보를 가져오지 못했습니다. 재로그인해주세요.");
                        navigate("/login");
                    }); 
                }
            })
        }
        catch(error){
            alert("아이디 또는 비밀번호를 확인해주세요.");
            setBlock(false);
        }
    }
    function scrollto(e){
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return(
        <>
            <Background/>
            <Container>
                {block ? <BlockModal/> : null}
                <Title/>
                <LoginForm>
                            <input 
                                className="id"
                                placeholder="아이디"
                                defaultValue={ID}
                                onChange={e => setID(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <input
                                className="pw"
                                type="password"
                                placeholder="비밀번호"
                                defaultValue={PW}
                                onChange={e => setPW(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <LoginBtn 
                                className={ id!=""&&password!="" ? 'active' : ''}
                                onClick={()=>login()}
                               >로그인 하기</LoginBtn>
                </LoginForm>
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Container>
        </>
    )
}
export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
`
const LoginForm = styled.form`
    width: ${vw(250)};
    margin-top: 45px;

    display: flex;
    flex-direction: column;
    .pw{
        margin: 16px 0 20px 0;
    }
    @media only screen  and (max-width: 300px){
        margin-top: 30px;
    }
    @media only screen  and (min-width: 700px) and (max-width: 850px){
        .pw{
            margin: 30px 0 40px 0;
        }
    }
    input{
        width: 100%;
        aspect-ratio: 1 / 0.18;
        padding-left: 16px;

        font-size: ${vw(14)};
        font-family: 'SF_HambakSnow';

        border-style: none;
        border-radius: 5px;
        outline: none;
    }
`
const LoginBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 1 / 0.2;

    border-style: none;
    border-radius: 5px;

    font-family: 'SF_HambakSnow';
    font-size: ${vw(14)};

    color: var(--white);
    background-color: var(--gray1);
    &.active {
		background-color: var(--green);
	}
`
const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 20px;
`