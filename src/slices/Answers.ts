import { AnswerStatus, QuestionAnswer } from "src/types/Answer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswersState {
  answers: QuestionAnswer[];
}

const initialState: AnswersState = {
  answers: [],
};

export const AnswersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<QuestionAnswer>) => {
      const { category, duration, status } = action.payload;
      state.answers = [...state.answers, { category, status, duration }];
    },
    resetAnswers(state): void {
      state.answers = [];
    },
  },
});

export const { addAnswer } = AnswersSlice.actions;

export default AnswersSlice.reducer;
