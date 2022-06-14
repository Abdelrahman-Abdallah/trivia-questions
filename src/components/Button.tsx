import styled, { css } from "styled-components";

interface ButtonProps {
  isSelected?: boolean;
  topMargin?: number;
  disabled?: boolean;
}

const Button = styled("button")<ButtonProps>`
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 10px;
  width: 25%;
  max-width: 300px;
  margin-top: ${(props) => (props.topMargin ? `${props.topMargin}px` : "0")};
  ${(props) =>
    props.isSelected &&
    css`
      background-color: black;
      color: white;
    `};
  ${(props) =>
    props.disabled &&
    css`
      background-color: #ddd;
      border-color: transparent;
      cursor: not-allowed;
    `}
`;

export default Button;
