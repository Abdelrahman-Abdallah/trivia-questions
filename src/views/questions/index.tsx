import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import Loader from "src/components/Loader";
import Page from "src/components/page";
import { getQuestions } from "src/lib/questions";
import { addAnswer } from "src/slices/Answers";
import { fetchCategoryQuestions, resetActiveQuestions } from "src/slices/Categories";
// import { addQuestionStatus } from "src/slices/Questions";
import { useDispatch, useSelector } from "src/store";
import Level from "src/types/Level";
import { Question } from "src/types/Question";
import QuestionItem from "./QuestionItem";

const Questions = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { categoryQuestions: questions, activeCatgory } = useSelector((state) => state.categories);
  const level = useSelector((state) => state.user.level);
  const [selectedQuestion, setSelectedQuesiton] = useState<Question | null>(null);

  const questionTime = level === Level.easy ? 90 : level === Level.medium ? 60 : 30;

  useEffect(() => {
    dispatch(fetchCategoryQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) setSelectedQuesiton(questions[0]);
  }, [questions]);

  const handleChangeNextQuestion = useCallback((): void => {
    if (!selectedQuestion) return;
    const index = questions.findIndex(({ question }) => question === selectedQuestion.question);
    console.log("🚀 ~ file: index.tsx ~ line 40 ~ handleChangeNextQuestion ~ index", index);
    if (index === questions.length - 1) {
      history.push("/categories");
    } else {
      setSelectedQuesiton({ ...questions[index + 1] });
    }
  }, [history, questions, selectedQuestion]);

  function getShuffledAnswers(): string[] {
    const answers = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
    answers.sort((a, b) => 0.5 - Math.random());
    return [...answers];
  }

  const handleNextQuestion = useCallback(
    (answer: string, duration: number) => {
      if (!selectedQuestion) return;
      const isCorrectAnswer = answer === selectedQuestion.correct_answer;
      dispatch(addAnswer({ category: activeCatgory, duration, status: isCorrectAnswer ? "correct" : "wrong" }));
      handleChangeNextQuestion();
    },
    [handleChangeNextQuestion, selectedQuestion, activeCatgory, dispatch]
  );

  const handleSkipQuestion = useCallback(
    (duration: number): void => {
      dispatch(addAnswer({ category: activeCatgory, duration, status: "skipped" }));
      handleChangeNextQuestion();
    },
    [dispatch, activeCatgory, handleChangeNextQuestion]
  );

  function renderQuestion() {
    if (questions.length === 0 || !selectedQuestion) return <Loader />;
    return (
      <QuestionItem
        question={selectedQuestion}
        onNext={handleNextQuestion}
        onSkip={handleSkipQuestion}
        answers={getShuffledAnswers()}
        questionTime={questionTime}
      />
    );
  }

  return <Page title="Questions">{renderQuestion()}</Page>;
};

export default Questions;
