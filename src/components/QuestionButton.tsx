import styled from "styled-components";

interface QuestionButtonProps {
  isSelected: boolean;
}

const QuestionButton = styled("div")<QuestionButtonProps>`
  flex: 0 40%;
  height: 150px;
  padding: 15px;
  position: relative;
  display: flex;
  margin: 5px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--question-hot-key-color);
  border-radius: 10px;
  color: var(--text-color-primary-ligth);
  cursor: pointer;
  background: ${(props) =>
    !props.isSelected
      ? "linear-gradient(288deg, var(--category-color-primary), var(--category-color-secodary))"
      : "linear-gradient(288deg,#1363DF,#8dd4ffe6)"};
`;

export default QuestionButton;
