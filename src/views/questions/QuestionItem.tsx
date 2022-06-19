import React, { FC, useCallback, useEffect, useState } from "react";
import Timer from "src/components/Timer";
import useTimer from "src/hooks/useTimer";
import { useSelector } from "src/store";
import Level from "src/types/Level";
import { Question } from "src/types/Question";
import { Box, Button, Container, Flex, Heading } from "rendition";
import McqQuestions from "./McqQuestions";
import useKeyboardKey from "src/hooks/useKeyboard";

interface QuestionItemProps {
  question: Question;
  onNext: (selectedAnswer: string, timing: number) => void;
  onSkip: (time: number) => void;
  answers: string[];
  timing?: number;
}
const QuestionItem: FC<QuestionItemProps> = ({ onNext, question, onSkip, answers, timing }) => {
  // const level = useSelector((state) => state.user.level);
  // const time = level === Level.easy ? 90 : level === Level.medium ? 60 : 30;
  const time = 20;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  console.log("🚀 ~ file: QuestionItem.tsx ~ line 23 ~ selectedAnswer", selectedAnswer);
  const currentTime = useTimer(time, onSkip, question.question);

  const handleSubmit = useCallback(() => {
    if (!selectedAnswer) return;
    const time = currentTime();
    onNext(selectedAnswer, time);
  }, [currentTime, selectedAnswer, onNext]);

  const handleSkip = useCallback(() => {
    const time = currentTime();
    onSkip(time);
  }, [currentTime, onSkip]);

  const handleKeyPress = useCallback(
    (key: string): void => {
      switch (key) {
        case "t":
          if (question.type === "boolean") setSelectedAnswer("True");
          return;

        case "f":
          if (question.type === "boolean") setSelectedAnswer("False");
          return;

        case "1":
          if (question.type === "multiple") setSelectedAnswer(answers[+key - 1]);
          return;
        case "2":
          if (question.type === "multiple") setSelectedAnswer(answers[+key - 1]);
          return;
        case "3":
          if (question.type === "multiple") setSelectedAnswer(answers[+key - 1]);
          return;
        case "4":
          if (question.type === "multiple") setSelectedAnswer(answers[+key - 1]);
          return;
        case "n":
          handleSubmit();
          return;
        case "s":
          handleSkip();
          return;
        default:
          break;
      }
    },
    [answers, handleSkip, handleSubmit, question.type]
  );
  useKeyboardKey(handleKeyPress);

  useEffect(() => {
    setSelectedAnswer("");
  }, [answers]);

  function onChangeSelectedAnswer(answer: string): void {
    setSelectedAnswer(answer);
  }

  function renderAnswers(): JSX.Element {
    if (question.type === "boolean")
      return <McqQuestions answers={["True", "false"]} selectedAnswer={selectedAnswer} onChangeSelectedAnswer={onChangeSelectedAnswer} isBoolean />;
    return <McqQuestions answers={answers} selectedAnswer={selectedAnswer} onChangeSelectedAnswer={onChangeSelectedAnswer} />;
  }

  return (
    <div>
      <Timer degree={(currentTime() / time) * 360} />
      <Container>
        <Box paddingTop={120}>
          <Heading.h3 align="center">{question.question}</Heading.h3>
        </Box>
        {renderAnswers()}

        <Flex justifyContent="space-evenly">
          <Button onClick={handleSkip} color="secondary">
            Skip
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Next
          </Button>
        </Flex>
        <Box marginTop={10}>
          <Flex justifyContent="space-evenly">
            <Box>[n]:Next</Box>
            <Box>[s]:Skip</Box>
            {question.type !== "boolean" && <Box>[1,2,3,4]:Choose Answers</Box>}
            {question.type === "boolean" && <Box>[t,f]:Choose answers</Box>}
          </Flex>
        </Box>
      </Container>
    </div>
  );
};

export default React.memo(QuestionItem);
