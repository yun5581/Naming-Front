import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector,useAppDispatch} from "../../redux/store";
import { setDictionaryID, setOption, setDictionary } from "../../redux/dictionarySlice";
// api
import { Logout, SubmitCustom } from "../../api/user";
//components
import { vw, vh, useResize } from "../../components/SizeConvert";
import Footer from "../../components/Footer";
import Dictionary from "../../components/customPage/Dictionary";
import SelectColor from "../../components/customPage/SelectColor";
import SelectShape from "../../components/customPage/SelectShape";
import SelectDeco from "../../components/customPage/SelectDeco";
//images
import background from "../../images/background.svg";
// data
import { colorData } from "../../_mock/customInfo";
import SelectScolor from "../../components/customPage/SelectScolor";
import Background from "../../components/Background";


const CustomPage = () =>{
    const navigate = useNavigate();
    // 유저 정보 가져오기
    const {name, userId} = useAppSelector(state=>state.user);

    // 커스텀 메뉴 관리
    const dispatch =useAppDispatch();
    const {option} = useAppSelector(state=>state.dictionary); 

    const saveOption = (optionNum) =>{
        dispatch(setOption({option: optionNum}));
    }
    const checkOption = () =>{
        var num = option;
        if(num==null) num=0; 
        return num;
    }
    // 커스텀 선택 값 관리
    const [bookColor, setBookColor] = useState("grey");
    const [shape, setShape] = useState(1);
    const [shapeColor, setShapeColor] = useState(1);
    const [deco, setDeco] = useState(1);
    
    var click = true;
    function overClick() {
        if (click) {
            console.log("클릭됨");
            click = !click;
        } else {
            console.log("중복됨");
        }
    }
    // 커스텀 정보 전달 코드
    const submit_custom =()=>{
        SubmitCustom(name, bookColor, shape, shapeColor, deco)
        .then(res=>{
            if(res.message=="사전 만들기 성공"){
                // 사전 아이디 저장
                dispatch(setDictionaryID({dictionaryId: res.data.id})); 
                // 사전 커스텀 정보 리덕스 저장
                // dispatch(setDictionary({
                //     colors: res.data.color,
                //     shapeNums: res.data.shadow,
                //     shapeColors: res.data.shadowColor,
                //     decoNums: res.data.border
                // }))
                // 커스텀 페이지 저장 정보 삭제
                reset();
                navigate("/home");
            }
        }).catch((error)=>{
            alert("사전 정보 저장 실패\n 다시 시도해주세요");
        })
    }
    // 새로고침 방지 경고 코드 
    const preventClose = (e=BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = ""; //Chrome에서 동작하도록; deprecated
    };  
    useEffect(() => {
        (() => {
            window.addEventListener("beforeunload", preventClose);
        })();   
        return () => {
            window.removeEventListener("beforeunload", preventClose);
        };
        }, []);
    // 선택 값 초기화 
    const reset = () =>{
        dispatch(setOption({option: ""}));
        sessionStorage.setItem("Bcolor",""); 
        sessionStorage.setItem("shapeNum","");
        sessionStorage.setItem("Scolor","");
        sessionStorage.setItem("decoNum","");
        //window.location.reload();
    }
    return(
        <>
            <Background/>
            <Container>
                <Title>
                    나만의 사전을 만들어보세요!
                    <hr style={{marginTop: "10px"}}/>
                </Title>
                <Dictionary  title={name} color={bookColor}
                            shapeNum={shape} shpaeColor={shapeColor}
                            decoNum={deco}/>
                <CustomForm>
                    <MenuBar>
                        <div onClick={()=>saveOption(0)} className={checkOption()==0 ? 'active' : ''}>표지색</div><hr/>
                        <div onClick={()=>saveOption(1)} className={checkOption()==1 ? 'active' : ''}>실루엣</div><hr/>
                        <div onClick={()=>saveOption(2)} className={checkOption()==2 ? 'active' : ''}>실루엣 색</div><hr/>
                        <div onClick={()=>saveOption(3)} className={checkOption()==3 ? 'active' : ''}>기타</div>
                    </MenuBar>
                    {checkOption()==0 ? <SelectColor setBookColor={setBookColor} />: null} 
                    {checkOption()==1 ? <SelectShape setShape={setShape}/>: null}
                    {checkOption()==2 ? <SelectScolor setShapeColor={setShapeColor}/>: null}
                    {checkOption()==3 ? <SelectDeco setDeco={setDeco}/>: null}
                </CustomForm>
                <SubmitButton onClick={()=>{submit_custom()}}>완료</SubmitButton>
                {/* 리셋용 임시 코드 */}
                {/* <button onClick={()=> reset()}>리셋</button> */}
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Container>
        </>
    )
}

export default CustomPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    font-family: var(--hb-font);
`
const Title = styled.div`
    margin: ${vh(54)} 0 ${vh(28)} 0;
    display: flex;
    flex-direction: column;

    font-size: ${vw(20)};
    color: var(--white);
`
const CustomForm = styled.div`
    width: 100vw;
    height: ${vh(206)};
    /* aspect-ratio: 1/ 0.67; */
    margin: ${vh(27)} 0 ${vh(9)} 0;

    display: flex;
    justify-content: space-between;
    @media only screen  and (min-width: 500px){
        width: ${vw(375)};
    }
`
const MenuBar = styled.div`
    width: 25%;
    /* height: ${vh(206)}; */

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 0 5px 5px 0;
    background-color: var(--white);
    font-size: ${vw(14)};
    color: var(--black);
    div{
        height: 25%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.active {
        color: var(--green);
        }
    }
    hr{
        width: ${vw(80)};
    }
`
const SubmitButton = styled.button`
    width: ${vw(270)};
    aspect-ratio: 1 / 0.2;
    margin-top: ${vh(29)};

    background-color: var(--green);
    color: var(--white);
    border-radius: ${vw(5)};

    border-style: none;
    font-family: var(--hb-font);
    font-size: ${vw(16)};
`
const FooterWrapper = styled.div`
    position: absolute;
    bottom: 0;
    padding: 20px;
`