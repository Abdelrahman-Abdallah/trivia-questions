import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import categoriesReducer, { resetActiveQuestions, resetCategoryState } from "../slices/Categories";
import userReducer, { resetUser } from "../slices/User";
import answersReducer, { resetAnswers } from "../slices/Answers";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    answers: answersReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export function resetStore() {
  store.dispatch(resetAnswers());
  store.dispatch(resetActiveQuestions());
  store.dispatch(resetUser());
  store.dispatch(resetCategoryState());
}
