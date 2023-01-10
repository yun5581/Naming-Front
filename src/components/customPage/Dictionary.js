import styled from "styled-components";
//components
import { vw, vh } from "../../components/SizeConvert";
//images
import frame from "../../images/customPage/bookFrame.svg";
const Dictionary = () =>{
    return(
        <>
            <Wrapper>
                <object type="image/svg+xml" data={frame} className="frame"/>
            </Wrapper>
        </>
    )
}

export default Dictionary;

const Wrapper = styled.div`
    .frame{
        width: ${vw(171.32)};
        height: ${vh(249)};
    }
`