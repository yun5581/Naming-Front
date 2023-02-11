import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
//components
import { vw, vh } from "../../components/SizeConvert";
// data
import { makrData } from "../../_mock/customInfo";
// 배경 images
import grey from "../../images/customPage/background/Bgrey.svg";
import green from "../../images/customPage/background/Bgreen.svg";
import purple from "../../images/customPage/background/Bpurple.svg";
import blue from "../../images/customPage/background/Bblue.svg";
import red from "../../images/customPage/background/Bred.svg";
import yellow from "../../images/customPage/background/Byellow.svg";
import star from "../../images/customPage/starD.svg";
// 실루엣 images
import Cshape1_1 from "../../images/customPage/Cshape/Cshape1_1.svg";
import Cshape1_2 from "../../images/customPage/Cshape/Cshape1_2.svg";
import Cshape1_3 from "../../images/customPage/Cshape/Cshape1_3.svg";
import Cshape1_4 from "../../images/customPage/Cshape/Cshape1_4.svg";
import Cshape1_5 from "../../images/customPage/Cshape/Cshape1_5.svg";
import Cshape2_1 from "../../images/customPage/Cshape/Cshape2_1.svg";
import Cshape2_2 from "../../images/customPage/Cshape/Cshape2_2.svg";
import Cshape2_3 from "../../images/customPage/Cshape/Cshape2_3.svg";
import Cshape2_4 from "../../images/customPage/Cshape/Cshape2_4.svg";
import Cshape2_5 from "../../images/customPage/Cshape/Cshape2_5.svg";
import Cshape3_1 from "../../images/customPage/Cshape/Cshape3_1.svg";
import Cshape3_2 from "../../images/customPage/Cshape/Cshape3_2.svg";
import Cshape3_3 from "../../images/customPage/Cshape/Cshape3_3.svg";
import Cshape3_4 from "../../images/customPage/Cshape/Cshape3_4.svg";
import Cshape3_5 from "../../images/customPage/Cshape/Cshape3_5.svg";
import Cshape4_1 from "../../images/customPage/Cshape/Cshape4_1.svg";
import Cshape4_2 from "../../images/customPage/Cshape/Cshape4_2.svg";
import Cshape4_3 from "../../images/customPage/Cshape/Cshape4_3.svg";
import Cshape4_4 from "../../images/customPage/Cshape/Cshape4_4.svg";
import Cshape4_5 from "../../images/customPage/Cshape/Cshape4_5.svg";
import Cshape5_1 from "../../images/customPage/Cshape/Cshape5_1.svg";
import Cshape5_2 from "../../images/customPage/Cshape/Cshape5_2.svg";
import Cshape5_3 from "../../images/customPage/Cshape/Cshape5_3.svg";
import Cshape5_4 from "../../images/customPage/Cshape/Cshape5_4.svg";
import Cshape5_5 from "../../images/customPage/Cshape/Cshape5_5.svg";
import Cshape6_1 from "../../images/customPage/Cshape/Cshape6_1.svg";
import Cshape6_2 from "../../images/customPage/Cshape/Cshape6_2.svg";
import Cshape6_3 from "../../images/customPage/Cshape/Cshape6_3.svg";
import Cshape6_4 from "../../images/customPage/Cshape/Cshape6_4.svg";
import Cshape6_5 from "../../images/customPage/Cshape/Cshape6_5.svg";
// 기타 iamges
import Dcircle from "../../images/customPage/deco/Dcircle.svg";
import Darch from "../../images/customPage/deco/Darch.svg";
import Drectangle from "../../images/customPage/deco/Drectangle.svg";
import Dcircle2 from "../../images/customPage/deco/Dcircle2.svg";

const Dictionary = props =>{
    // 사전 꾸미기 정보 가져오기 
    var color = sessionStorage.getItem("Bcolor"); 
    var shapeNum = Number(sessionStorage.getItem("shapeNum"));
    var shapeColor = Number(sessionStorage.getItem("Scolor"));
    var decoNum = sessionStorage.getItem("decoNum");
    
    // 사전 표지색 리턴 함수
    const Bcolor =()=>{
        switch(color){
            case "grey": color=grey; break;
            case "green": color=green; break;
            case "purple": color=purple; break;
            case "blue": color=blue; break;
            case "red": color=red; break;
            case "yellow": color=yellow; break;
            default: color=grey;
        }
        return color;
    }
    // 사전 실루엣 색 리턴함수
    const shape= () =>{
        if(shapeNum==0) shapeNum = 1;
        if(shapeColor==0) shapeColor =1;
        switch(shapeColor){
            case 1:
                switch(shapeNum){
                    case 1: shapeNum=Cshape1_1; break; case 2: shapeNum=Cshape2_1; break; 
                    case 3: shapeNum=Cshape3_1; break; case 4: shapeNum=Cshape4_1; break;
                    case 5: shapeNum=Cshape5_1; break; case 6: shapeNum=Cshape6_1; break;
                    default: shapeNum=Cshape1_1; } break;
            case 2:
                switch(shapeNum){
                    case 1: shapeNum=Cshape1_2; break; case 2: shapeNum=Cshape2_2; break; 
                    case 3: shapeNum=Cshape3_2; break; case 4: shapeNum=Cshape4_2; break;
                    case 5: shapeNum=Cshape5_2; break; case 6: shapeNum=Cshape6_2; break;
                    default: shapeNum=Cshape1_2; } break;
            case 3:
                switch(shapeNum){
                    case 1: shapeNum=Cshape1_3; break; case 2: shapeNum=Cshape2_3; break; 
                    case 3: shapeNum=Cshape3_3; break; case 4: shapeNum=Cshape4_3; break;
                    case 5: shapeNum=Cshape5_3; break; case 6: shapeNum=Cshape6_3; break;
                    default: shapeNum=Cshape1_3; } break;
            case 4:
                switch(shapeNum){
                    case 1: shapeNum=Cshape1_4; break; case 2: shapeNum=Cshape2_4; break; 
                    case 3: shapeNum=Cshape3_4; break; case 4: shapeNum=Cshape4_4; break;
                    case 5: shapeNum=Cshape5_4; break; case 6: shapeNum=Cshape6_4; break;
                    default: shapeNum=Cshape1_4; } break;
            case 5:
                switch(shapeNum){
                    case 1: shapeNum=Cshape1_5; break; case 2: shapeNum=Cshape2_5; break; 
                    case 3: shapeNum=Cshape3_5; break; case 4: shapeNum=Cshape4_5; break;
                    case 5: shapeNum=Cshape5_5; break; case 6: shapeNum=Cshape6_5; break;
                    default: shapeNum=Cshape1_5; } break;
            default: 
                switch(shapeNum){
                    case 2: shapeNum=Cshape2_1; break; case 3: shapeNum=Cshape3_1; break;
                    case 4: shapeNum=Cshape4_1; break; case 5: shapeNum=Cshape5_1; break;
                    case 6: shapeNum=Cshape6_1; break; default: shapeNum=Cshape1_1;                    
                }
        }
        return shapeNum;
    }
    // 사전 기타 꾸미기 리턴 함수
    const deco = () =>{
        switch(decoNum){
            case "1": decoNum=Dcircle; break;
            case "2": decoNum=Darch; break;
            case "3": decoNum=Drectangle; break;
            case "4": decoNum=Dcircle2; break;
            default: decoNum=Dcircle;
        }
        return decoNum;
    }
    return(
        <>
            <Wrapper>
                <Background style={{
                    backgroundImage: `url(${Bcolor()})`}}>
                <Line/>
                <Container>
                    <object type="image/svg+xml" data={star} className="star"/>
                    <Title>
                        <div>{props.title}하다</div>
                        <hr/>
                    </Title>
                    <Shape style={{ backgroundImage: `url(${deco()})`}}>
                        <object type="image/svg+xml" data={shape()} className="shape"/>
                    </Shape>
                    <Bookfooter>
                        <div>Definitions of My Name</div>
                        <p>ⓒ 2022. likelion_ewha All rights reserved.</p>
                    </Bookfooter>
                </Container>
                </Background>
                <Bookmark>
                   {makrData.map((mark,text)=>{
                    return(<div>
                        {mark.text}
                    </div>)
                   })}
                </Bookmark>
            </Wrapper>
        </>
    )
}

export default Dictionary;

const Wrapper = styled.div`
    display:flex;
    padding-left: ${vw(11)};
`
const Background = styled.div`
    aspect-ratio: 0.7/ 1;
    height: ${vh(249)};
    position: relative;
    z-index: 0;
    display: flex;
    /* @media only screen  and (min-width: 500px){
        height: ${vh(249)};
    } */
`
const Line = styled.div`
    height: 100%;
    width: 0.5px;
    margin-left: ${vw(12)};

    background: #404040;
    box-shadow: 0px 0px 9px #000000;
`
const Container=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .star{
        margin-top: ${vh(16)};
        width: ${vw(3)};
    }
`
const Title=styled.div`
    width: ${vw(70)};
    color: #FFFFFF;
    margin-top: ${vh(7)};
    text-align: center;
    div{
        font-size: ${vw(14)};
        color: var(--white);
    }
    hr{
        margin-top: 3px;
        border-width: 0  0px 1px 1px;
        border-color: var(--white);
    }
`
const Shape = styled.div`
    /* border: solid; */
    aspect-ratio: 1 / 1.5;
    height: 56%;
    margin-top: ${vh(12)};

    display: flex;
    justify-content: center;
    align-items: center;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;

    .shape{
        width: 50%;
    }
`
const Bookfooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${vh(12)};

    color: var(--white);
    div{
        font-size: ${vw(10)};
        zoom: 0.65;
    }
    p{
        margin-top: 2px;
        font-size: ${vw(7)};
        font-family: var(--sm-font);
        zoom: 0.4;
    }
`
const Bookmark = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: ${vh(12)};
    
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5%;
        background: var(--white);
        border-radius: 0 2px 2px 0;
        /* font-size: ${vw(9)}; */
        font-size: ${vh(8)};
        /* zoom: 0.7; */
    }
`