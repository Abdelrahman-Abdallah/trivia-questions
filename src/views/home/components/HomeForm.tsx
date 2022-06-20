import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Level from "../../../types/Level";
import LevelButtons from "./LevelButtons";

const Container = styled.div`
  background-color: #ddd;
  padding: 1rem;
  width: 45%;
  text-align: center;
  padding: 3rem 0.4rem;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 60%;
  }
  @media (max-width: 540px) {
    flex-direction: column;
    width: 95%;
  }
`;

interface HomeFormProps {
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  level: Level;
  onChangeLevel: (level: Level) => void;
}
const HomeForm: FC<HomeFormProps> = ({ onChangeName, value, level, onChangeLevel }) => {
  return (
    <Container>
      <TextInput onChange={onChangeName} value={value} type="text" placeholder="enter your name" />
      <LevelButtons level={level} onChangeLevel={onChangeLevel} />
    </Container>
  );
};

export default HomeForm;
