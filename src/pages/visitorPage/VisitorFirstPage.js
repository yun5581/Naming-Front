import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { getDictionary } from "../../api/user";
//redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
//component
import { Pretendard,SF_HambakSnow} from "../../components/Text";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
//image
import background from "../../images/background.svg";
import dic from '../../images/VisitorPage/dic_visitor_first.svg'
import pagebar1 from '../../images/VisitorPage/pagebar1.svg'
import pagebar2 from '../../images/VisitorPage/pagebar2.svg'
import pagebar3 from '../../images/VisitorPage/pagebar3.svg'


const GreenBtn = ({ children, onClick, margin }) => {
  return (
    <Button onClick={onClick} style={{marginTop:'214px'}}>
      {children}
    </Button>
  );
};


const VisitorFirstPage = () => {
  const { dictionaryId } = useAppSelector((state) => state.dictionary);
  const { name } = useAppSelector((state) => state.user);
  const [page,setPage] = useState(1)
  const [input,setInput] = useState(0)
  const [isInput, setIsInput] = useState(true)
  const [consonant,setConsonant] = useState('ㄴ')
  const [example,setExample] = useState('(ex. 넉살이 좋은, 나눔을 잘하는, 노는 것을 좋아하는)')

  useEffect(()=>{
    ranConsonant()
    },[])
  const ranConsonant = () =>{
    const n = Math.floor(Math.random()*15)
    setConsonant(consonants[n].con)
    setExample(consonants[n].ex)
  }

  const changeButton = (e) => {
    // e.preventDefault();
    setInput(e.target.value)
    console.log(input)

    if (input.length > 0) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }
  };


  const Next = () =>{
    setPage(page+1)
    console.log(page)
  }


  const pages = () => {
   

    
    if (page === 1){
      return (
      <>
      <TitleBox>
        <Title>반갑습니다.</Title>
        <Title style={{'color':'var(--green)','marginLeft':'4px'}} >{name}</Title>
        <Title>님!</Title>
      </TitleBox>
        <TextBox>
          <Pretendard
          weight='400'
          size='14px'
          height = '20px'>
            <span style={{color:'var(--green)',fontWeight:'600'}}>이름하여 이름하다</span>
            <span>는 <br/> 주변인들이 적어주는 정의로 <br/> 본인의 사전을 채워가는 서비스 입니다.</span>
            <span><br/><br/>각 자음별로 시작하는 사전 주인에 대한</span>
            <span style={{color:'var(--green)',fontWeight:'600'}}><br/>솔직하고 재치있는 단어와 문장</span>
            <span>을 <br/> 채워주시길 바랍니다.</span>
            </Pretendard>
          </TextBox>
          <GreenBtn onClick={Next}>다음</GreenBtn>
          <PageBar>
          <object type='image/svg+xml' data={pagebar1}>
              <img src={pagebar1}/>
          </object>
          </PageBar>
      </>
            )}

     else if (page === 2 ){
        return(
          <>
          <TitleBox>
          <Title>첫번째 정의 작성은</Title>
        </TitleBox>
          <TextBox>
            <Pretendard
            weight='400'
            size='14px'
            height = '20px'>
              <span>자음이 </span>
              <span style={{color:'var(--green)',fontWeight:'600'}}>랜덤으로 배정됩니다!</span>
              <span><br/><br/> 첫 번째 정의 작성 이후엔 <br/>사전을 둘러보며 자유롭게 작성할 수 있습니다.</span>
              <span><br/><br/>작성한 정의는 수정할 수 없으니 <br/>신중하게 작성해 주시기 바랍니다. </span>
              </Pretendard>
            </TextBox>
            <GreenBtn onClick={Next}>다음</GreenBtn>
            <PageBar>
            <object type='image/svg+xml' data={pagebar2}>
              <img src={pagebar2}/>
            </object>
            </PageBar>
          </>
        )} 
        else if (page === 3)  {
          return(
            <>
            <TitleBox>
              <Title>첫번째 정의 작성은</Title>
            </TitleBox>
            <TextBox>
              <SF_HambakSnow
              weight='800'
              size='100px'
              color= 'var(--green)'
              style={{marginTop:'10px'}}
              >{consonant}</SF_HambakSnow>
          <Pretendard
          weight='500'
          size='13px'
         >
            <span> 으로 시작하는 </span>
            <span style={{color:'var(--green)'}}> (이름)하다의 정의</span>
            <span>를 작성해 주세요.</span>
            </Pretendard>
            <Pretendard
          weight='300'
          size='10px'
          height = '12px'
          style={{marginBottom:'80px'}}>
            <br/> {example}
          </Pretendard>
          </TextBox>
          <InputBox>
          <input placeholder="내용을 입력해주세요" style={{
                    width: '100%',
                    backgroundColor:'transparent', 
                    color:'var(--black)',
                    border:'none',
                    fontFamiliy:'Pretendard',
                    fontSize:'13px',
                    padding:'0 15px'
                    }}
                    />
            </InputBox>
          {isInput ? (
                    <GreenBtn onClick={Next}>
                        완료
                    </GreenBtn>
                 ):(
                  <DisabledBtn>
                  완료
                </DisabledBtn>
                )}
            <PageBar>
            <object type='image/svg+xml' data={pagebar3}>
              <img src={pagebar3}/>
            </object>
            </PageBar>
            </>
                )
        }
        else {
          return(
            <>
              <Emoji>👏🏻</Emoji>
              <TitleBox style={{marginTop:'125px'}}>
              <Title>작성이 완료되었습니다!</Title>
              </TitleBox>
              <TextBox>
              <Pretendard
                weight='400'
                size='13px'
              >
            <span> (이름)하다 사전을 둘러보며 정의를 추가하거나
              <br/> 나만의 사전을 만들어보세요.  </span>
            </Pretendard>
            </TextBox>
            <BrowseBtn>
            <Link to='/definition' 
            style={{textDecoration:'none', color:'var(--green)'}}>
              (이름)하다 사전 둘러보기
              </Link>
              </BrowseBtn>
            <GreenBtn>
              <Link to='/' 
              style={{textDecoration:'none', color:'var(--white)'}}>
                내 사전 만들러 가기
                </Link>
              </GreenBtn>
            </>
          )
        }
  }

  return(
    <>
      <Background>
        <BodyContainer>
          <Sidebar/>
          <DicContainer>
            {pages()}
          <object type='image/svg+xml' data={dic}>
              <img src={dic}/>
            </object>
          </DicContainer>
        </BodyContainer>
        <FooterWrapper>
        <Footer/>
      </FooterWrapper>
      </Background>
    </>
    )
}

export default VisitorFirstPage

const consonants = [
  {'con':'ㄱ','ex':"(ex. 관대한, 꼼꼼한, 개나리를 좋아하는)"},
  {'con':'ㄴ','ex':"(ex. 넉살이 좋은, 나눔을 잘하는, 노는 것을 좋아하는)"},
  {'con':'ㄷ','ex':"(ex. 다정한, 독창적인, 똑똑한, 다람쥐를 닮은)"},
  {'con':'ㄹ','ex':"(ex. 로망, 리코더를 잘 부는, 레몬색이 잘 어울리는)"},
  {'con':'ㅁ','ex':"(ex. 마음이 따뜻한, 멋진, 미식가, 믿을만한)"},
  {'con':'ㅂ','ex':"(ex. 배려를 잘하는, 박식한, 보라색을 좋아하는)"},
  {'con':'ㅅ','ex':"(ex. 사려깊은, 신중한, 생기있는, 수다쟁이)"},
  {'con':'ㅇ','ex':"(ex. 용감한, 영리한, 애정이 넘치는, 옷을 잘 입는)"},
  {'con':'ㅈ','ex':"(ex. 적극적인, 재치있는, 정확한 계산을 잘하는)"},
  {'con':'ㅊ','ex':"(ex. 천진난만한, 초록색을 좋아하는, 창의적인)"},
  {'con':'ㅋ','ex':"(ex. 쾌활한, 쿠키를 잘 만드는)"},
  {'con':'ㅌ','ex':"(ex. 타고난, 특이한, 태권도를 잘하는)"},
  {'con':'ㅍ','ex':"(ex. 편견이 없는, 폼생폼사, 피자를 좋아하는)"},
  {'con':'ㅎ','ex':"(ex. 활동적인, 합리적인, 하늘색이 잘 어울리는)"},
]

const Background = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
`

const BodyContainer = styled.div`
  margin: 0 auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`

const Title = styled.p`
  font-family: 'SF_HambakSnow';
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
`

const TitleBox = styled.div`
  display: flex;
  position: absolute; 
  text-align: center;

  margin-bottom: 300px;
`

const DicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 25%;

  img{
    width: 265.85px;
    height: 384px;
    position: relative;
  }
`

const TextBox = styled.div`
  width: 70%;

  justify-content: center;
  align-items: center;
  position: absolute;

  margin-bottom: 80px;
  text-align: center;
`

const Button = styled.button`
  position: absolute;
  width: 226px;
  height: 46px;
  margin-top: 200px;
  background-color: var(--green);
  border: none;
  border-radius: 5px;
  font-family: SF_HambakSnow;
  color: var(--white);
`

const DisabledBtn = styled.button`
  color: var(--white);
  background-color: var(--gray1);
  position: absolute;
  width: 226px;
  height: 46px;
  margin-top: 214px;
  border: none;
  border-radius: 5px;
  font-family: SF_HambakSnow;
  
`;

const BrowseBtn = styled.button`
  color: var(--green);
  background-color: #FFFFFF;
  position: absolute;
  width: 226px;
  height: 46px;
  border: 1px solid var(--green);
  border-radius: 5px;
  font-family: SF_HambakSnow;
  margin-top: 100px;
`

const InputBox = styled.div` 
  position: absolute;
  width: 226px;
  height: 46px;
  border-radius: 5px;
  background-color: var(--gray0);

  display: flex;
  align-items: center;
  margin-top: 100px;

`

const PageBar = styled.div`
  position: absolute;
  margin-top: 325px;

`
const Emoji = styled.div`
  position: absolute;
  margin-bottom: 250px;
  font-size: 24px;


`

const FooterWrapper = styled.div`
    height: 100vh;
    margin-top: 30px;
    padding-bottom: 30px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    margin: 0 auto;
`
