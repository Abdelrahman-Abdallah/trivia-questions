import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { Level } from "../../../types/Common";
import LevelButtons from "./LevelButtons";

const Container = styled.div`
  background-color: #ddd;
  padding: 1rem;
  width: 30%;
  text-align: center;
  padding: 3rem 0.4rem;
  border-radius: 10px;
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
