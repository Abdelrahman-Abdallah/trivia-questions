import React from "react";
import { Box, Flex, Heading } from "rendition";
import { useSelector } from "src/store";

const AnswersDuration = () => {
  const answers = useSelector((state) => state.answers.answers);
  const totalseconds = answers.reduce((seconds, v) => seconds + v.duration, 0);
  const minites = Math.floor(totalseconds / 60);
  const seconds = totalseconds - 60 * minites;

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Box>
        {/* eslint-disable-next-line react/jsx-pascal-case*/}
        <Heading.h1>
          Total Time {minites}:{seconds < 0 ? "0" + seconds : seconds}
        </Heading.h1>
      </Box>
    </Flex>
  );
};

export default AnswersDuration;
