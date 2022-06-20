import { ChangeEvent, FC } from "react";
import { Input } from "rendition";
import styled from "styled-components";
import Level from "../../../types/Level";
import LevelButtons from "./LevelButtons";

const Container = styled.div`
  padding: 1rem;
  width: 45%;
  text-align: center;
  padding: 3rem 1.4rem;
  border-radius: 10px;
  box-shadow: 2px 9px 19px -1px rgba(0, 0, 0, 0.5);

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
      <Input onChange={onChangeName} value={value} placeholder="enter your name" />
      {/* <TextInput onChange={onChangeName} value={value} type="text" placeholder="enter your name" /> */}
      <LevelButtons level={level} onChangeLevel={onChangeLevel} />
    </Container>
  );
};

export default HomeForm;
