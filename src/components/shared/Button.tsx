import React, { MouseEvent } from 'react'
import { Button as MuiButton, styled } from "@mui/material";

const StyledButton = styled(MuiButton)({
  height: 30,
  borderRadius: 0,
  margin: "0px 2px",
  border: "none",
  padding: "0px 14px !important",
  fontWeight: 700,
  minWidth: "40px",
  textTransform: "unset",
  columnGap: "6px",
});

interface ButtonProps {
  icon?: React.ReactNode,
  color?: "inherit" | "error" | "primary" | "secondary" | "success" | "info" | "warning";
  onClick: () => void;
  stopPropagation?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, color, onClick, stopPropagation, children }) => {

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) event.stopPropagation();
    onClick();
  }

  return <StyledButton variant="contained" color={color} onClick={handleClick}>
    {icon}
    {children}
  </StyledButton>
}

export default Button
