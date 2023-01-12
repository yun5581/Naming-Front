import React from "react";
import styled from "styled-components";

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
  font-size: 16px;

  width: 316.88px;
  height: 46px;

  border: none;
  border-radius: 5px;

  align-items: center;
  text-align: center;
`;
