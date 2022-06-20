import styled from "styled-components";

const ChartContainer = styled.div`
  max-height: 350px;
  flex: 0 45%;
  margin: 5px;
  border: 1px solid black;
  padding: 5px;

  @media (max-width: 540px) {
    flex: 0 95%;
  }
`;

export default ChartContainer;
