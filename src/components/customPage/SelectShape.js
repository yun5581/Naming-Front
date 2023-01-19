import styled from "styled-components";
import { vw, vh } from "../SizeConvert";
//imgages
import shape1 from "../../images/customPage/shape/shape1.svg";
import shape2 from "../../images/customPage/shape/shape2.svg";
import shape3 from "../../images/customPage/shape/shape3.svg";
import shape4 from "../../images/customPage/shape/shape4.svg";
import shape5 from "../../images/customPage/shape/shape5.svg";
import shape6 from "../../images/customPage/shape/shape6.svg";

const SelectShape = props =>{
    const save_shape=(number)=>{
        props.setShape(number);
        //리덕스로 저장하는 코드로 수정하기
        sessionStorage.setItem("shapeNum",number);
    }
    return(
        <>
            <Wrapper>
                <Shape><div style={{backgroundImage:`url(${shape1})`}}
                            onClick={()=>save_shape(1)}/></Shape>
                <Shape><div style={{backgroundImage:`url(${shape2})`}}
                            onClick={()=>save_shape(2)}/></Shape>
                <Shape><div style={{backgroundImage:`url(${shape3})`}}
                            onClick={()=>save_shape(3)}/></Shape>
                 <Shape><div style={{backgroundImage:`url(${shape4})`}}
                            onClick={()=>save_shape(4)}/></Shape>
                 <Shape style={{marginBottom: vh(15)}}><div style={{backgroundImage:`url(${shape5})`}}
                            onClick={()=>save_shape(5)}/></Shape>
                  <Shape style={{marginBottom: vh(15)}}><div style={{backgroundImage:`url(${shape6})`}}
                            onClick={()=>save_shape(6)}/></Shape>
                {/* <Shape><div/><object type="image/svg+xml" data={shape1}/></Shape>
                <Shape><object type="image/svg+xml" data={shape2}/></Shape>
                <Shape style={{marginBottom: vh(15)}}>
                   <object type="image/svg+xml" data={shape3}/>
                </Shape> */}
            </Wrapper>
        </>
    )
}

export default SelectShape;

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
    width: ${vw(91)};
    margin-top: ${vh(18)};
    background-color: #D9D9D9;
    padding: ${vw(6)};
    
    div{ 
        width: 100%;
        aspect-ratio: 0.73 /1;
        background-repeat: no-repeat;
        background-size:  ${vw(91)};
        background-position: center center;
    }
`