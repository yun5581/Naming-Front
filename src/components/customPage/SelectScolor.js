import styled from "styled-components";
import { vw,vh } from "../SizeConvert";
import { sCircleData } from "../../_mock/customInfo";
//images 
import Scolor1 from "../../images/customPage/Cshape/Scolor1.svg";
import Scolor2 from "../../images/customPage/Cshape/Scolor2.svg";
import Scolor3 from "../../images/customPage/Cshape/Scolor3.svg";
import Scolor4 from "../../images/customPage/Cshape/Scolor4.svg";
import Scolor5 from "../../images/customPage/Cshape/Scolor5.svg";
import check from "../../images/customPage/check.svg";

const SelectScolor = props =>{
    const save_sColor=(number)=>{
        props.setShapeColor(number);
        sessionStorage.setItem("Scolor",number);
    }
    const return_scolor = ()=>{
        var scolor = sessionStorage.getItem("Scolor");
        return scolor;
    }
    return(
        <>
            <Wrapper>
               <div style={{ backgroundImage: `url(${Scolor1})`}} onClick={()=>save_sColor(1)}>
                    {(return_scolor()==1)||(return_scolor()=="") ? <object type="image/svg+xml" data={check} className="check"/>: null}
               </div>
               <div style={{ backgroundImage: `url(${Scolor2})`}} onClick={()=>save_sColor(2)}>
                    {return_scolor()==2 ? <object type="image/svg+xml" data={check} className="check"/>: null}
               </div>
               <div style={{ backgroundImage: `url(${Scolor3})`}} onClick={()=>save_sColor(3)}>
                    {return_scolor()==3 ? <object type="image/svg+xml" data={check} className="check"/>: null}
               </div>
               <div style={{ backgroundImage: `url(${Scolor4})`}} onClick={()=>save_sColor(4)}>
                    {return_scolor()==4 ? <object type="image/svg+xml" data={check} className="check"/>: null}
               </div>
               <div style={{ backgroundImage: `url(${Scolor5})`}} onClick={()=>save_sColor(5)}>
                    {return_scolor()==5 ? <object type="image/svg+xml" data={check} className="check"/>: null}
               </div>
            </Wrapper>
        </>
    )
}

export default SelectScolor;

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

        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        .check{
            width: 50%;
            display: block;
        }
    }
`
