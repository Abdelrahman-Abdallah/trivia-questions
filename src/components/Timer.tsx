import styled from "styled-components";

interface TimerProps {
  degree: number;
}

const Timer = styled("div")<TimerProps>`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  top: 10px;
  left: 20px;
  position: absolute;
  background: ${(props) => `conic-gradient(red ${props.degree}deg,blue 0deg)`};
`;
export default Timer;
