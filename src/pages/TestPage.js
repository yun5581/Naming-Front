import { useState } from "react";
const TestPage = () =>{
    const [content, setContent] = useState("");
    const consonant = "ㅁ";
    const testInput = "바보";
    // 자음 검사 함수
    const checkInput = () =>{
        const input = getConstantVowel(content[0]).f;
        console.log("입력된 값의 초성: "+input);
        input == consonant ? console.log("자음 일치") : console.log("자음 불일치");
    }
    // 한글 첫 글자 분리 함수
    function getConstantVowel(kor) {
        const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
                   'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
                   'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
        const ga = 44032;
        let uni = kor.charCodeAt(0);
    
        uni = uni - ga;
    
        let fn = parseInt(uni / 588);
        return {
            f: f[fn]
        };
    }
    return (
        <>
            <div>
            <input placeholder="내용을 입력해주세요" style={{
                    width: '300px',
                    backgroundColor:'transparent', 
                    color:'var(--black)',
                    border:'solid',
                    fontFamiliy:'Pretendard',
                    fontSize:'13px',
                    padding:'0 15px'
                    }}
                    onChange={(e)=>{
                        setContent(e.target.value);
                        checkInput();
                    }}
                    />
            </div>
        </>
    )
}

export default TestPage;