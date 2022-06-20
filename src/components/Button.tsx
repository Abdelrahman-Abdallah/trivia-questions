import styled, { css } from "styled-components";

interface ButtonProps {
  isSelected?: boolean;
  topMargin?: number;
  disabled?: boolean;
}

const Button = styled("button")<ButtonProps>`
  padding: 0.5 rem 1rem;
  height: 40px;
  text-align: center;
  font-size: 1rem;
  border-radius: 10px;
  flex: 0 30%;
  max-width: 300px;
  border: none;
  margin-top: ${(props) => (props.topMargin ? `${props.topMargin}px` : "0")};
  ${(props) =>
    props.isSelected &&
    css`
      background-color: #1a72cd;
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
