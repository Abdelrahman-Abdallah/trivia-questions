import { Level } from "./Level";

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: Level;
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
}
