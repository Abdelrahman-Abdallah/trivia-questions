import { QuestionAnswer } from "./../types/Answer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCateories } from "../lib/categories";
import { AppThunk } from "../store/index";
import { Category } from "../types/Category";
import { getQuestions } from "src/lib/questions";
import { Question } from "src/types/Question";

interface CategoriesState {
  categories: Category[];
  selectedCategories: string[];
  isLoaded: boolean;
  activeCatgory: string;
  categoryQuestions: Question[];
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategories: [],
  isLoaded: false,
  activeCatgory: "",
  categoryQuestions: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.isLoaded = true;
    },
    addSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategories = [...state.selectedCategories, action.payload];
    },

    setCategoryQuestions: (state, action: PayloadAction<{ activeCategory: string; questions: Question[] }>) => {
      const { activeCategory, questions } = action.payload;
      state.activeCatgory = activeCategory;
      state.categoryQuestions = questions;
    },

    resetActiveQuestions: (state) => {
      state.activeCatgory = "";
      state.categoryQuestions = [];
    },
  },
});

export const { setCategories, addSelectedCategory, resetActiveQuestions, setCategoryQuestions } = categoriesSlice.actions;

export const fetchSliceCategories =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    if (getState().categories.categories.length > 0) return;
    const categories = await getCateories();
    dispatch(setCategories(categories));
  };

export const fetchCategoryQuestions =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    try {
      const categoryId = [...getState().categories.selectedCategories].pop();
      console.log("🚀 ~ file: Categories.ts ~ line 64 ~ categoryId", categoryId);
      const { level, token } = getState().user;

      const questions = await getQuestions(level, token, categoryId);
      dispatch(setCategoryQuestions({ activeCategory: categoryId, questions }));
    } catch (err) {
      console.log(err);
    }
  };

export default categoriesSlice.reducer;
