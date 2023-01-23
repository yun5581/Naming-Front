import { useState } from "react";
import styled from "styled-components";
//data
import { colorData } from "../../_mock/customInfo"
//components
import { vw, vh } from "../../components/SizeConvert";
import check from "../../images/customPage/check.svg";

const SelectColor = props =>{
    //색상 선택 관리 
    const [select, setSelect] =useState("grey");
    return(
        <>
        <Wrapper>
        {colorData.
            map((data,code,color)=>{
                return (<div style={{backgroundColor: data.code}}
                            className={data.color}
                            onClick={()=>{{
                                props.setBookColor(data.color)};
                                setSelect(data.color);
                                sessionStorage.setItem("Bcolor",data.color);
                            }}>
                            {sessionStorage.getItem("Bcolor")==data.color? <object type="image/svg+xml" data={check} className="check"/>: 
                            sessionStorage.getItem("Bcolor")==""&&data.color=="grey"? <object type="image/svg+xml" data={check} className="check"/>: null}
                        </div>)
                    })}
        </Wrapper>
        </>
    )
}

export default SelectColor;

const Wrapper = styled.div`
    width: 70%;
    height: ${vh(206)};
    background-color: var(--white);
    border-radius: ${vw(5)} 0 0 ${vw(5)};

    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr; 
    padding: ${vh(20)} 0 ${vh(20)} 0;
    div{
        width: ${vw(45)};
        height: ${vw(45)};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        .check{
            width: 50%;
            display: block;
        }
    }
`