import { Level } from "./../types/Level";
import { Question } from "./../types/Question";

export async function getQuestions(level: Level, token: string, categoryId: string): Promise<Question[]> {
  const response = await fetch(`https://opentdb.com/api.php?amount=3&category=${categoryId}&difficulty=${level}`);
  const data = await response.json();
  console.log("🚀 ~ file: questions.ts ~ line 7 ~ getQuestions ~ data", data);
  return data.results as Question[];
}
