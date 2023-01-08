import { useEffect, useState } from "react";
import { isMobile, isBrowser } from 'react-device-detect';
export const vw = (width) =>{
  var result;
  if(isMobile){
    // 아이패드 같이 mobile이지만 가로가 긴 모델
    window.innerWidth > 500 ?
    result = (0.267 * width * 0.85)+"vw":
    result = (0.267 * width)+"vw";
  }
  else result = width+"px";
  return result;
};

export const vh = (height) =>{
  var result;
  isMobile ? 
  result = (0.129 * height)+"vh":
  result = height+"px";
  return result;
};

export const useResize = () =>{
    const [resize, setResize] = useState();

    const handleResize = () => {
        setResize(window.innerWidth);
        console.log(resize);
        window.location.reload();
      };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    return;
}
