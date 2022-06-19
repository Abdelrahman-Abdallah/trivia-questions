import { Level } from "./../types/Level";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/index";
import { getUserToken } from "src/lib/api";

interface QuestionResult {
  status: "correct" | "wrong" | "skipped";
  category: string;
  time: number;
}

interface QuestionState {
  questions: QuestionResult[];
}

const initialState: QuestionState = {
  questions: [],
};

export const QuestionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionResult>) => {
      const { category, time, status } = action.payload;
      state.questions = [...state.questions, { category, status, time }];
    },
  },
});

export const { addQuestion } = QuestionSlice.actions;

// export const addQuestionStatus =
//   (result: QuestionResult): AppThunk =>
//   (dispatch): void => {
//     dispatch(addQuestion(result));
//   };

export default QuestionSlice.reducer;
