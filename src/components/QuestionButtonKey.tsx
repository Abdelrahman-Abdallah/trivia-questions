import styled from "styled-components";

const QuestionButtonKey = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-left: none;
  border-top: none;
  background-color: var(--question-hot-key-color);
  border-top-left-radius: 10px;
  font-size: 20px;
`;

export default QuestionButtonKey;
