import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Flex, Heading } from "rendition";
import ChartContainer from "src/components/ChartContainer";
import Page from "src/components/page";
import { resetStore, useSelector } from "src/store";
import AnswersDuration from "./AnswersDuration";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import StackedChart from "./stackedChart";

const Result = () => {
  const { name } = useSelector((state) => state.user);
  const history = useHistory();

  const handleClearData = () => {
    resetStore();
    history.push("/");
  };

  return (
    <Page title="Result">
      <Container textAlign="center">
        {/*eslint-disable-next-line react/jsx-pascal-case*/}
        <Heading.h1>{name}</Heading.h1>
      </Container>
      <Flex flexWrap="wrap" justifyContent="center">
        <ChartContainer>
          <AnswersDuration />
        </ChartContainer>

        <ChartContainer>
          <PieChart />
        </ChartContainer>

        <ChartContainer>
          <StackedChart />
        </ChartContainer>
        <ChartContainer>
          <LineChart />
        </ChartContainer>
      </Flex>
      <Box my={20}>
        <Flex alignItems="center" justifyContent="center">
          <Button onClick={handleClearData}>NEW GAME</Button>
        </Flex>
      </Box>
    </Page>
  );
};

export default Result;
