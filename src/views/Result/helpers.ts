import { ANSWERS } from "src/__mocks__/Answers";
export function extractStackChartData() {
  const categories = [...new Set(ANSWERS.map((answer) => answer.category))];
  const baseZeroArray = new Array(categories.length).fill(0);

  const mappedAnswers = ANSWERS.reduce(
    (acc, answer) => {
      const categoryIndex = categories.indexOf(answer.category);
      console.log("🚀 ~ file: helpers.ts ~ line 8 ~ extractStackChartData ~ categoryIndex", categoryIndex);
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

export function extractPieData() {
  return ANSWERS.reduce((acc, answer) => {
    acc[answer.status] = acc[answer.status] + 1 || 1;
    return acc;
  }, {} as Record<string, number>);
}
