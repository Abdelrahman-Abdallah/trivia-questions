import React, { ChangeEvent, useState } from "react";
import Page from "../../components/page";
import { CenterdContent } from "../../components/CenteredContent";
import HomeForm from "./components/HomeForm";
import Level from "../../types/Level";
import Button from "../../components/Button";
import { useDispatch } from "src/store";
import { addUserToken, setUser } from "src/slices/User";
import { useNavigate } from "react-router-dom";
import { Container, Flex } from "rendition";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gameOptions, setGameOptions] = useState({
    name: "",
    level: Level.easy,
  });

  useEffect(() => {
    dispatch(addUserToken());
  }, [dispatch]);

  function handleChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setGameOptions((prevState) => ({ ...prevState, name: event.target.value }));
  }
  function handleChangeLevel(level: Level): void {
    setGameOptions((prevState) => ({ ...prevState, level }));
  }

  async function handleSubmit(): Promise<void> {
    if (!gameOptions.name) return;

    dispatch(setUser({ name: gameOptions.name, level: gameOptions.level }));
    navigate("/categories");
  }

  return (
    <Page title="Home">
      <Container>
        <Flex alignItems="center" justifyContent="center" flexDirection="column" height="80vh">
          <HomeForm onChangeName={handleChangeName} value={gameOptions.name} level={gameOptions.level} onChangeLevel={handleChangeLevel} />
          <Button topMargin={25} disabled={!gameOptions.name} onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
      </Container>
    </Page>
  );
};

export default Home;
