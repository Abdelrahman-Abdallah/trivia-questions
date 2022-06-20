import { NUM_OF_ALLOWED_CATEGORIES } from "src/constants";
import { Level } from "./../types/Level";
import { Question } from "./../types/Question";

export async function getQuestions(level: Level, token: string, categoryId: string): Promise<Question[]> {
  console.log("🚀 ~ file: questions.ts ~ line 6 ~ getQuestions ~ categoryId", categoryId);
  console.log("🚀 ~ file: questions.ts ~ line 6 ~ getQuestions ~ token", token);
  console.log("🚀 ~ file: questions.ts ~ line 6 ~ getQuestions ~ level", level);
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${NUM_OF_ALLOWED_CATEGORIES}&category=${categoryId}&difficulty=${level}&token=${token}`
  );
  const data = await response.json();
  console.log("🚀 ~ file: questions.ts ~ line 7 ~ getQuestions ~ data", data);
  return data.results as Question[];
}
