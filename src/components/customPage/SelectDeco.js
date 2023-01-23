import styled from "styled-components";
import { vw, vh } from "../SizeConvert";
//images
import Dcircle from "../../images/customPage/deco/Dcircle.svg";
import Darch from "../../images/customPage/deco/Darch.svg";
import Drectangle from "../../images/customPage/deco/Drectangle.svg";
import Dcircle2 from "../../images/customPage/deco/Dcircle2.svg";

const SelectDeco = props =>{
    const save_deco=(number)=>{
        props.setDeco(number);
        //리덕스로 저장하는 코드로 수정하기
        sessionStorage.setItem("decoNum",number);
    }
    return(
        <>
            <Wrapper>
                <Shape><div style={{backgroundImage:`url(${Dcircle})`}}
                            onClick={()=>save_deco(1)}/></Shape>
                <Shape><div style={{backgroundImage:`url(${Darch})`}}
                            onClick={()=>save_deco(2)}/></Shape>
                <Shape style={{marginBottom: vh(15)}}>
                    <div style={{backgroundImage:`url(${Drectangle})`}}
                        onClick={()=>save_deco(3)}/>
                </Shape>
                <Shape style={{marginBottom: vh(15)}}>
                    <div style={{backgroundImage:`url(${Dcircle2})`}}
                        onClick={()=>save_deco(4)}/>
                </Shape>
            </Wrapper>
        </>
    )
}

export default SelectDeco;

const Wrapper = styled.div`
    width: 70%;
    height: ${vh(206)};
    background-color: var(--white);
    border-radius: ${vw(5)} 0 0 ${vw(5)};

    overflow: auto;
    ::-webkit-scrollbar {
        width: ${vw(6)};
        background-color: #D9D9D9;
    }
    ::-webkit-scrollbar-thumb {
    height: 30%;
    background: var(--green);
    
    border-radius: 5px;
    }

    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
`
const Shape = styled.div`
    width: ${vw(95)};
    margin-top: ${vh(18)};
    padding: ${vw(6)};
    display: flex;
    background-color: #D9D9D9;
    div{ 
        width: 100%;
        aspect-ratio: 0.7 /1;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: ${vw(78)};
    }
`