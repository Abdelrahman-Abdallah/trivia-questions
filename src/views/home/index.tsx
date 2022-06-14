import React, { ChangeEvent, useState } from "react";
import Page from "../../components/page";
import { CenterdContent } from "../../components/CenteredContent";
import HomeForm from "./components/HomeForm";
import { Level } from "../../types/Common";
import Button from "../../components/Button";

const Home = () => {
  const [gameOptions, setGameOptions] = useState({
    name: "",
    level: Level.easy,
  });

  function handleChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setGameOptions((prevState) => ({ ...prevState, name: event.target.value }));
  }
  function handleChangeLevel(level: Level): void {
    setGameOptions((prevState) => ({ ...prevState, level }));
  }

  return (
    <Page title="Home">
      <CenterdContent>
        <HomeForm onChangeName={handleChangeName} value={gameOptions.name} level={gameOptions.level} onChangeLevel={handleChangeLevel} />
        <Button topMargin={25}>Submit</Button>
      </CenterdContent>
    </Page>
  );
};

export default Home;
