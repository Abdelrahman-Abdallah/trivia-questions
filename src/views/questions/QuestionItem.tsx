import React, { FC, useCallback, useEffect, useState } from "react";
import Timer from "src/components/Timer";
import useTimer from "src/hooks/useTimer";
import { Question } from "src/types/Question";
import { Box, Button, Container, Flex, Heading } from "rendition";
import McqQuestions from "./McqQuestions";
import useKeyboardKey from "src/hooks/useKeyboard";
import KeysInstructions from "src/components/KeysInstructions";
import { getSelectedItemByKeyClick } from "src/utils/getSelectedItemByKeyClick";
import QuestionHeading from "src/components/QuestionHeading";

interface QuestionItemProps {
  question: Question;
  onNext: (selectedAnswer: string, timing: number) => void;
  onSkip: (time: number) => void;
  answers: string[];
  questionTime: number;
}
const QuestionItem: FC<QuestionItemProps> = ({ onNext, question, onSkip, answers, questionTime }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const currentTime = useTimer(questionTime, onSkip, question.question);

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
        default: {
          const id = getSelectedItemByKeyClick(key, selectedAnswer, 2, answers);
          if (id) setSelectedAnswer(id);
          break;
        }
      }
    },
    [answers, handleSkip, handleSubmit, question.type, selectedAnswer]
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
      <Timer degree={(currentTime() / questionTime) * 360} />
      <div>
        <Box paddingTop={120}>
          {/*eslint-disable-next-line react/jsx-pascal-case*/}
          <Heading.h3 align="center">
            <QuestionHeading>{question.question}</QuestionHeading>
          </Heading.h3>
        </Box>
        {renderAnswers()}

        <Flex justifyContent="space-around">
          <Button onClick={handleSkip} color="secondary">
            Skip
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Next
          </Button>
        </Flex>
        <KeysInstructions position="fixed">
          <Box>[n]:Next</Box>
          <Box>[s]:Skip</Box>
          <Box>[ArrowKeys]:to select answer</Box>
          {question.type !== "boolean" && <Box>[1,2,3,4]:Choose Answers</Box>}
          {question.type === "boolean" && <Box>[t,f]:Choose answers</Box>}
        </KeysInstructions>
      </div>
    </div>
  );
};

export default QuestionItem;
