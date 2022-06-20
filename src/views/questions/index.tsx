import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "src/components/page";
import { getQuestions } from "src/lib/questions";
import { addAnswer } from "src/slices/Answers";
// import { addQuestionStatus } from "src/slices/Questions";
import { useDispatch, useSelector } from "src/store";
import { Question } from "src/types/Question";
import QUESTIONS from "src/__mocks__/questions";
import QuestionItem from "./QuestionItem";

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { level, token } = useSelector((state) => state.user);
  const selectedCateogy = useSelector((state) => state.categories.selectedCategories);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuesiton] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const category = selectedCateogy[selectedCateogy.length - 1];
  console.log("🚀 ~ file: index.tsx ~ line 22 ~ Questions ~ category", category);

  const fetchQuestions = useCallback(async () => {
    try {
      const questions = await getQuestions(level, token, category);
      console.log("🚀 ~ file: index.tsx ~ line 27 ~ fetchQuestions ~ questions", questions);
      setQuestions(questions);
      setSelectedQuesiton(questions[0]);
    } catch (err) {
      console.log("🚀 ~ file: index.tsx ~ line 33 ~ fetchQuestions ~ err", err);
    }
  }, [level, token, category]);

  useEffect(() => {
    fetchQuestions();
  }, [level, token, category, fetchQuestions]);

  const handleChangeNextQuestion = useCallback((): void => {
    if (!selectedQuestion) return;
    const index = questions.findIndex(({ question }) => question === selectedQuestion.question);
    if (index === questions.length - 1) {
      navigate("/categories");
    } else {
      setSelectedQuesiton({ ...questions[index + 1] });
    }
  }, [navigate, questions, selectedQuestion]);

  function getShuffledAnswers(): string[] {
    const answers = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
    answers.sort((a, b) => 0.5 - Math.random());
    return [...answers];
  }

  const handleNextQuestion = useCallback(
    (answer: string, duration: number) => {
      if (!selectedQuestion) return;
      const isCorrectAnswer = answer === selectedQuestion.correct_answer;

      dispatch(addAnswer({ category, duration, status: isCorrectAnswer ? "correct" : "wrong" }));
      handleChangeNextQuestion();
    },
    [handleChangeNextQuestion, selectedQuestion, category, dispatch]
  );

  function handleSkipQuestion(duration: number): void {
    dispatch(addAnswer({ category, duration, status: "skipped" }));
    handleChangeNextQuestion();
  }

  function renderQuestion() {
    if (isLoading) return <h1>LOADING</h1>;
    if (questions.length === 0 || !selectedQuestion || isLoading) return <h1>Loading...</h1>;
    return <QuestionItem question={selectedQuestion} onNext={handleNextQuestion} onSkip={handleSkipQuestion} answers={getShuffledAnswers()} />;
  }

  return <Page title="Questions">{renderQuestion()}</Page>;
};

export default React.memo(Questions);
