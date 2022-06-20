import React, { ChangeEvent, useState } from "react";
import Page from "../../components/page";
import HomeForm from "./components/HomeForm";
import Level from "../../types/Level";
import { useDispatch } from "src/store";
import { addUserToken, setUser } from "src/slices/User";
import { Container, Flex, Button, Box } from "rendition";
import { useEffect } from "react";
import useKeyboardKey from "src/hooks/useKeyboard";
import { getSelectedItemByKeyClick } from "src/utils/getSelectedItemByKeyClick";
import { useHistory } from "react-router-dom";
import KeysInstructions from "src/components/KeysInstructions";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [gameOptions, setGameOptions] = useState({
    name: "",
    level: Level.easy,
  });

  useEffect(() => {
    dispatch(addUserToken());
  }, [dispatch]);

  async function handleSubmit(): Promise<void> {
    if (!gameOptions.name) return;

    dispatch(setUser({ name: gameOptions.name, level: gameOptions.level }));
    history.push("/categories");
  }

  const handleKeyClick = (key: string) => {
    if (key === "s") {
      handleSubmit();
      return;
    }

    const id = getSelectedItemByKeyClick(key, gameOptions.level, 3, Object.values(Level));
    if (!id) return;
    setGameOptions((prevState) => ({ ...prevState, level: id }));
  };

  useKeyboardKey(handleKeyClick);

  function handleChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setGameOptions((prevState) => ({ ...prevState, name: event.target.value }));
  }
  function handleChangeLevel(level: Level): void {
    setGameOptions((prevState) => ({ ...prevState, level }));
  }

  return (
    <Page title="Home">
      <Container>
        <Flex alignItems="center" justifyContent="center" flexDirection="column" height="80vh">
          <HomeForm onChangeName={handleChangeName} value={gameOptions.name} level={gameOptions.level} onChangeLevel={handleChangeLevel} />

          <Box my={20}>
            <Button width={150} primary onClick={handleSubmit} disabled={!gameOptions.name}>
              Submit
            </Button>
          </Box>
        </Flex>
      </Container>
      <KeysInstructions position="absolute">
        <Box>[Arrow]:Move between choices</Box>
        <Box>[S]:Submit</Box>
      </KeysInstructions>
    </Page>
  );
};

export default Home;
