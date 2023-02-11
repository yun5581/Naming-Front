import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useResize, vh, vw } from "../SizeConvert";
import { Logout } from "../../api/user";

//components
import { SF_HambakSnow, Simonetta } from "../Text";

//images
import {FaBook, FaUserCircle , FaGithub} from "react-icons/fa";
import hamburger from "../../images/Sidebar/sideBar.svg";

const VisitorSidebar = (props) => {
  const [show, setShow] = useState(false);
  const sidebarAction = (e) => {
    setShow(!show);
    return { show };
  };
  // 사이드바 배경 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <HamburgerWrapper onClick={sidebarAction}>
        <img src={hamburger} className="hamburger" />
      </HamburgerWrapper>
      {show ? (
        <BarWrapper>
          <LinkWrapper>
            <SF_HambakSnow style={{ marginRight: "32px"}}>
              <FaBook className="icon"/>
              {<Link to="/register">사전 만들기</Link>}
            </SF_HambakSnow>
            <SF_HambakSnow style={{ marginRight: "32px" }}>
              <FaUserCircle className="icon"/>
              <Link to="/login">로그인</Link>
            </SF_HambakSnow>
            <SF_HambakSnow style={{ marginRight: "32px" }}>
                <FaGithub className="icon"/>
                <a href="https://github.com/NAME-ING/Naming-Front">Git</a>
            </SF_HambakSnow>
          </LinkWrapper>
        </BarWrapper>
      ) : (
        <></>
      )}
      {show ? <OuterToToggleSideBar onClick={sidebarAction} /> : ""}
    </>
  );
};

export default VisitorSidebar;


const OuterToToggleSideBar = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99;
  opacity: 0.8;
  background-color: black;
  position: fixed;
`;

const HamburgerWrapper = styled.div`
  .hamburger {
    margin-top: ${vh(41)};
    margin-left: ${vw(0)};
    width: ${vw(24)};
    position: fixed;
    left: ${vw(50)};
    top: ${vh(21)};
    z-index: 100;
  }
`;
const LinkWrapper = styled.div`
  width: fit-content;
  margin-left: ${vw(40)};
  /* margin-top: ${vh(60)}; */
  margin-top: 25%;
  .icon {
    color: #818181;
    width: ${vw(22)};
    height: ${vh(20)};
    justify-content: flex-end;
  }
`;

const BarWrapper = styled.div`
  z-index: 100;
  width: ${vw(200)};
  height: 50%;
  background: #ffffff;
  border-radius: 0px 5px 5px 0px;
  position: absolute;
  left: 0;
  margin-top: ${vh(100)};
  animation: LeftToRight 0.8s;
  @keyframes LeftToRight {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translateZ(0);
    }
  }
  a {
    margin-left: ${vw(13)};
    color: #818181;
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    color: #fbb03b;
  }
  p{
    font-weight: 800;
    font-size: ${vw(14)};
    margin-bottom: ${vh(44)};
    display: flex;
    align-items: center;
  }
`;
