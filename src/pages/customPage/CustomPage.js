import styled from "styled-components";
import Dictionary from "../../components/customPage/Dictionary";
//components
import { vw, vh } from "../../components/SizeConvert";
//images
import background from "../../images/background.svg";


const CustomPage = () =>{
    return(
        <>
            <Background>
                <Title>
                    나만의 사전을 만들어보세요!
                    <hr style={{marginTop: "10px"}}/>
                </Title>
                <Dictionary/>
                <CustomForm>
                    <MenuBar>
                        <div>표지색</div><hr/>
                        <div>실루엣</div><hr/>
                        <div>실루엣 색</div><hr/>
                        <div>기타</div>
                    </MenuBar>
                    <SelectColor>
                    </SelectColor>
                </CustomForm>
              
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
    margin: 54px 0 28px 0;
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
    aspect-ratio: 1/2;

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
    }
    hr{
        width: ${vw(80)};
    }
`
const SelectColor = styled.div`
    width: 70%;
    background-color: var(--white);
    border-radius: ${vw(5)} 0 0 ${vw(5)};
`