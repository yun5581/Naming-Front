import { useEffect, useState } from "react";
import styled from "styled-components";
//components
import { vw, vh } from "../../components/SizeConvert";
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


const CustomPage = () =>{
    // 커스텀 메뉴 관리 
    const [option, setOption] = useState(0); // 표지색:0, 실루엣: 1, 실루엣 색: 2, 기타: 3
    const saveOption = (optionNum) =>{
        setOption(optionNum);
        sessionStorage.setItem("option",optionNum);
    }
    const checkOption = () =>{
        var num = sessionStorage.getItem("option"); 
        if(num=="") num=0; 
        return num;
    }
    // 커스텀 선택 값 관리
    const [bookColor, setBookColor] = useState("grey");
    const [shape, setShape] = useState(1);
    const [shapeColor, setShapeColor] = useState(1);
    const [deco, setDeco] = useState(1);

    // 커스텀 정보 가져오기 (test 코드)
    var name = "채원"; // 유저 정보 받아오는 걸로 변경

    // 선택 값 초기화 (test 코드)
    const reset = () =>{
        sessionStorage.setItem("option","");
        sessionStorage.setItem("Bcolor",""); 
        sessionStorage.setItem("shapeNum","");
        sessionStorage.setItem("Scolor","");
        sessionStorage.setItem("decoNum","");
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
    return(
        <>
            <Background>
                <Title>
                    나만의 사전을 만들어보세요!
                    <hr style={{marginTop: "10px"}}/>
                </Title>
                <Dictionary bookColor={bookColor} name={name} shape={shape}/>
                <CustomForm>
                    <MenuBar>
                        <div onClick={()=>saveOption(0)} className={checkOption()==0 ? 'active' : ''}>표지색</div><hr/>
                        <div onClick={()=>saveOption(1)} className={checkOption()==1 ? 'active' : ''}>실루엣</div><hr/>
                        <div onClick={()=>saveOption(2)} className={checkOption()==2 ? 'active' : ''}>실루엣 색</div><hr/>
                        <div onClick={()=>saveOption(3)} className={checkOption()==3 ? 'active' : ''}>기타</div>
                    </MenuBar>
                    {checkOption()==0 ? <SelectColor setBookColor={setBookColor}/>: null} 
                    {checkOption()==1 ? <SelectShape setShape={setShape}/>: null}
                    {checkOption()==2 ? <SelectScolor setShapeColor={setShapeColor}/>: null}
                    {checkOption()==3 ? <SelectDeco setDeco={setDeco}/>: null}
                </CustomForm>
                <SubmitButton onClick={()=>{
                    reset();
                }}>완료</SubmitButton>
                <FooterWrapper>
                    <Footer/>
                </FooterWrapper>
            </Background>
        </>
    )
}

export default CustomPage;

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
    margin: ${vh(27)} 0 ${vh(9)} 0;

    display: flex;
    justify-content: space-between;
    @media only screen  and (min-width: 1000px){
        width: ${vw(375)};
    }
`
const MenuBar = styled.div`
    width: 25%;
    height: ${vh(206)};

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 0 ${vw(5)} ${vw(5)} 0;
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
    aspect-ratio: 5.8 / 1;
    margin-top: ${vh(29)};

    background-color: var(--green);
    color: var(--white);
    border-radius: ${vw(5)};

    border-style: none;
    font-family: var(--hb-font);
    font-size: ${vw(16)};
`
const FooterWrapper = styled.div`
    margin-top: 30px;
    padding-bottom: 30px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`
