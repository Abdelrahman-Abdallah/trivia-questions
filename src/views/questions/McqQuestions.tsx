import React, { FC } from "react";
import { Container, Flex } from "rendition";
import QuestionButton from "src/components/QuestionButton";
import QuestionButtonKey from "src/components/QuestionButtonKey";

interface McqQuestionsProps {
  answers: string[];
  selectedAnswer: string;
  onChangeSelectedAnswer: (selectedAnswer: string) => void;
  isBoolean?: boolean;
}

const McqQuestions: FC<McqQuestionsProps> = ({ answers, selectedAnswer, onChangeSelectedAnswer, isBoolean = false }) => {
  function handleChangeSelectedAnswer(answer: string) {
    return function () {
      onChangeSelectedAnswer(answer);
    };
  }

  function renderAnswers(): JSX.Element[] {
    return answers.map((answer, index) => (
      <QuestionButton key={answer} isSelected={selectedAnswer.toLowerCase() === answer.toLowerCase()} onClick={handleChangeSelectedAnswer(answer)}>
        <QuestionButtonKey>{isBoolean ? answer[0] : index + 1}</QuestionButtonKey>
        {answer}
      </QuestionButton>
    ));
  }

  return (
    <Container marginTop={25} marginBottom={25}>
      <Flex flexWrap="wrap" justifyContent="center">
        {renderAnswers()}
      </Flex>
    </Container>
  );
};

export default McqQuestions;
