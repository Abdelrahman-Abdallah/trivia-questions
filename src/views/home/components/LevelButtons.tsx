import React, { FC } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Level from "../../../types/Level";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 1rem 0;
`;

interface LevelButtonsProps {
  level: Level;
  onChangeLevel: (level: Level) => void;
}

const LevelButtons: FC<LevelButtonsProps> = ({ level, onChangeLevel }) => {
  function renderLevelButtons(): JSX.Element[] {
    function handleKeyClick(level: string) {
      return function () {
        onChangeLevel(level as Level);
      };
    }
    return Object.keys(Level).map((key) => (
      <Button key={key} onClick={handleKeyClick(key)} isSelected={key === level}>
        {key}
      </Button>
    ));
  }

  return <Content>{renderLevelButtons()}</Content>;
};

export default LevelButtons;
