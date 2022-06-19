export interface QuestionAnswer {
  category: string;
  duration: number;
  status: AnswerStatus;
}

export type AnswerStatus = "correct" | "wrong" | "skipped";
