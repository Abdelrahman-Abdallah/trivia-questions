import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch as useReduxDispatch } from "react-redux";
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";

import categoriesReducer from "../slices/Categories";
import userReducer from "../slices/User";
import questionReducer from "../slices/Questions";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    questions: questionReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
