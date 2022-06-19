import React from "react";
import { Box, Flex, Heading } from "rendition";
import { ANSWERS } from "src/__mocks__/Answers";

const AnswersDuration = () => {
  const totalsecons = ANSWERS.reduce((seconds, v) => seconds + v.duration, 0);
  console.log("🚀 ~ file: AnswersDuration.tsx ~ line 7 ~ AnswersDuration ~ totalsecons", totalsecons);
  const minites = Math.floor(totalsecons / 60);
  const seconds = totalsecons - 60 * minites;

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Box>
        <Heading.h1>
          Total Time {minites}:{seconds < 0 ? "0" + seconds : seconds}
        </Heading.h1>
      </Box>
    </Flex>
  );
};

export default AnswersDuration;
