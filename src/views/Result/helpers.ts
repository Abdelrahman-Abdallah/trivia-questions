import { QuestionAnswer } from "src/types/Answer";

export function extractStackChartData(answers: QuestionAnswer[]) {
  const categories = [...new Set(answers.map((answer) => answer.category))];
  const baseZeroArray = new Array(categories.length).fill(0);

  const mappedAnswers = answers.reduce(
    (acc, answer) => {
      const categoryIndex = categories.indexOf(answer.category);
      acc[answer.status][categoryIndex] = acc[answer.status][categoryIndex] ? acc[answer.status][categoryIndex] + 1 : 1;
      return acc;
    },
    {
      skipped: [...baseZeroArray],
      correct: [...baseZeroArray],
      wrong: [...baseZeroArray],
    }
  );

  const { correct, skipped, wrong } = mappedAnswers;
  return {
    correct,
    skipped: skipped.map((v) => v * -1),
    wrong: wrong.map((v) => v * -1),
    categories,
  };
}

export function extractPieData(answers: QuestionAnswer[]) {
  return answers.reduce((acc, answer) => {
    acc[answer.status] = acc[answer.status] + 1 || 1;
    return acc;
  }, {} as Record<string, number>);
}
