import React from "react";
import { Box, Button, Container, Flex, Heading } from "rendition";
import ChartContainer from "src/components/ChatContainer";
import { useSelector } from "src/store";
import AnswersDuration from "./AnswersDuration";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import StackedChart from "./stackedChart";

const Result = () => {
  const { name } = useSelector((state) => state.user);
  return (
    <Container>
      <Heading.h1>{name}</Heading.h1>
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
          <Button>NEW GAME</Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default Result;
