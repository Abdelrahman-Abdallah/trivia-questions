import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "src/components/page";
import { getQuestions } from "src/lib/questions";
// import { addQuestionStatus } from "src/slices/Questions";
import { useDispatch, useSelector } from "src/store";
import { Question } from "src/types/Question";
import QUESTIONS from "src/__mocks__/questions";
import QuestionItem from "./QuestionItem";

const Questions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [selectedQuestion, setSelectedQuesiton] = useState(QUESTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();
  // const selectedCateogy = useSelector((state) => state.categories.selectedCategorys);
  // const { level, token } = useSelector((state) => state.user);
  // const [questions, setQuestions] = useState<Question[]>([]);
  // const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  // const category = selectedCateogy[selectedCateogy.length - 1];

  // useEffect(() => {
  //   getQuestions(level, token, category).then((res) => {
  //     console.log(res);
  //     setQuestions(res);
  //     setSelectedQuestion(0);
  //   });
  // }, [level, token, category]);

  const handleChangeNextQuestion = useCallback((): void => {
    const index = questions.findIndex(({ question }) => question === selectedQuestion.question);
    console.log("🚀 ~ file: index.tsx ~ line 37 ~ handleSkipQuestion ~ index", index);
    if (index === questions.length - 1) {
      console.log(` we reached the end of the questions`);
      navigate("/categories");
    } else {
      setSelectedQuesiton({ ...questions[index + 1] });
    }
  }, [navigate, questions, selectedQuestion.question]);

  function getShuffledAnswers(): string[] {
    const answers = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
    answers.sort((a, b) => 0.5 - Math.random());
    return [...answers];
  }

  const handleNextQuestion = useCallback(
    (answer: string, time: number) => {
      const isCorrectAnswer = answer === selectedQuestion.correct_answer;
      console.log("🚀 ~ file: index.tsx ~ line 51 ~ handleNextQuestion ~ isCorrectAnswer", isCorrectAnswer);

      handleChangeNextQuestion();
      // dispatch(addQuestionStatus({ category, time, status: isCorrectAnswer ? "correct" : "wrong" }));
    },
    [handleChangeNextQuestion, selectedQuestion.correct_answer]
  );

  const handleNextQuestion = (answer: string, time: number) => {
    const isCorrectAnswer = answer === selectedQuestion.correct_answer;
    console.log("🚀 ~ file: index.tsx ~ line 61 ~ handleNextQuestion ~ time", time);
    console.log("🚀 ~ file: index.tsx ~ line 51 ~ handleNextQuestion ~ isCorrectAnswer", isCorrectAnswer);

    // const index = questions.findIndex(({ question }) => question === selectedQuestion.question);
    // if (index === questions.length - 1) {
    //   console.log(` we reached the end of the questions`);
    //   // navigate("/categories");
    // } else {
    //   setSelectedQuesiton({ ...questions[index + 1] });
    // }
    handleChangeNextQuestion();
    // dispatch(addQuestionStatus({ category, time, status: isCorrectAnswer ? "correct" : "wrong" }));
  };

  function handleSkipQuestion(time: number): void {
    console.log("🚀 ~ file: index.tsx ~ line 61 ~ handleSkipQuestion ~ time", time);
    handleChangeNextQuestion();
    dispatch(addQuestionStatus({ category, time, status: "skipped" }));
  }

  function renderQuestion() {
    if (questions.length === 0) return <h1>Loading...</h1>;
    return <QuestionItem question={selectedQuestion} onNext={handleNextQuestion} onSkip={handleSkipQuestion} answers={getShuffledAnswers()} />;
  }

  return <Page title="Questions">{renderQuestion()}</Page>;
};

export default React.memo(Questions);
