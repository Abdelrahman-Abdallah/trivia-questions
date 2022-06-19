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
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#DDD" : "")};
`;

export default QuestionButton;
