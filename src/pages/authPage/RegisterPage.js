import styled from "styled-components";
import { useState } from "react";
import { vw } from "../../components/SizeConvert";
//components
import Footer from "../../components/Footer";
import Title from "../../components/authPage/Title";
//images
import background from "../../images/background.svg";
import RegisterModal from "../../components/authPage/RegisterModal";
// api, 유저 정보
import { GetUser, PostUser } from "../../api/user";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/userSlice";

const RegisterPage = () =>{
    // 유저 리덕스 
    const dispatch =useAppDispatch();
    // 모달 관리 
    const [modal, setModal] = useState(false);
    function scrollto(e){
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // 회원가입 정보관리
    const [id, setID] = useState("");
    const [password, setPW] = useState("");
    const [password2, setPW2] = useState("");
    const [name, setName] = useState("");

    // 비밀번호 일치 확인 함수
    function checkInput(){
        var isSame;
        if(id!=""&&password!=""&&name!=""){
            password == password2 ?
            isSame = true:
            isSame = false;
        } 
        return isSame;
    }
    // 회원가입 함수 
    const register=(e, async)=>{
        if(id!=""&&password!=""&&checkInput()){
            PostUser(name, id, password)
                // .then(res=>{
                //     if(res.data.message=="회원가입 성공"){
                //         login();
                //         setModal(true);
                //     }
                //     else{
                //         alert("이미 존재하는 아이디입니다.");
                //     }
                // })
        }
    }
    // 로그인 함수
    const login = () =>{
        GetUser(id, password)
        // json-server용 임시 코드
        .then(()=>{
            var userId = 10; 
            dispatch(setUser(userId, name));
        })
        // .then(res=>{
        //     window.localStorage.setItem("token", JSON.stringify(res.data.access_token));
        //     dispatch(setUser(res.data));
        //     window.location.href="http://localhost:3000/"; // url 변경 필요
        // }).catch((error)=> console.log(error));
    }

    //json-server용 임시 코드
    // const register = () => {
    //     const userInfo = {
    //         firstname: name,
    //         loginId: id,
    //         password: password
    //     }
    //     fetch('http://localhost:4000/accounts/', {
    //       method: 'POST',
    //       headers: {"Content-Type": "application/json"},
    //       body: JSON.stringify(userInfo)
    //     }).then(() => {
    //         console.log('회원가입 성공');
    //         login();
    //         setModal(true); 
    //         dispatch(setUser(id, name));
    //     })
    //   }
    // 모달 정보 
    var number = 3;
    var name2 = "채원";
    return(
        <>
            <Background>
                {modal? <RegisterModal number={number} name={name2} setModal={setModal}/> :null}
                        <Title/>
                            <RegisterForm>
                            <input 
                                className="id"
                                // value={id}
                                placeholder="아이디"
                                onChange={e => setID(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <input
                                className="pw"
                                type="password"
                                placeholder="비밀번호"
                                onChange={e => setPW(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <input
                                className="pw2"
                                type="password"
                                placeholder="비밀번호 확인"
                                onChange={e => setPW2(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <input
                                className="name"
                                placeholder="이름만 입력해주세요 (예: 길동)"
                                onChange={e => setName(e.target.value)}
                                onClick={e=> scrollto(e)}
                                />
                            <RegisterBtn
                                onClick={()=>{register()}}
                                className={ checkInput() ? 'active' : ''}
                               >회원가입 하기</RegisterBtn>
                            </RegisterForm>
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Background>
        </>
    );
};

export default RegisterPage;

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
`

const RegisterForm = styled.div`
    width: ${vw(262)};

    display: flex;
    flex-direction: column;
    margin-top: 45px;
    .pw,.pw2{
        margin-top: 16px;
    }
    .name{
        margin: 16px 0 32px 0;
    }
    input{
        aspect-ratio: 5.8 / 1;
        padding-left: 16px;

        font-size: ${vw(14)};
        font-family: 'SF_HambakSnow';

        border-style: none;
        border-radius: 5px;
        outline: none;
    }
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media only screen  and (max-width: 300px){
        margin-top: 30px;
    }
    @media only screen  and (min-width: 700px) and (max-width: 850px){
        .pw,.pw2{
        margin-top: 26px;
        }
        .name{
            margin: 25px 0 40px 0;
        }
    }
`
const RegisterBtn = styled.div`
    aspect-ratio: 6 / 1;

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
    height: 100vh;
    margin-top: 30px;
    padding-bottom: 30px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`