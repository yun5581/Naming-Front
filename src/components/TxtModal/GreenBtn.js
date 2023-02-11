import React from "react";
import styled from "styled-components";
import { vw, vh } from "../SizeConvert";
const GreenBtn = ({ children, onClick, margin }) => {
  return (
    <Button onClick={onClick} margin={margin}>
      {children}
    </Button>
  );
};

export default GreenBtn;

const Button = styled.button`
  color: var(--white);
  background-color: var(--green);
  font-family: 'SF_HambakSnow';
  font-size: ${vw(16)};

  width: ${vw(316)};
  aspect-ratio: 6.8 / 1;

  border: none;
  border-radius: 5px;

  align-items: center;
  text-align: center;
`;
