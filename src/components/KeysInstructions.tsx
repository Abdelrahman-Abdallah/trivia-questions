import styled from "styled-components";

type Position = "fixed" | "absolute" | "unset";

const keysInstructions = styled("div")<{ position: Position }>`
  height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  background: var(--category-color-primary);
  color: var(--text-color-primary-ligth);
  position: ${(props) => props.position};
  bottom: 0;
`;

export default keysInstructions;
