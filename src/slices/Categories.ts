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
  isLoadingCategoryQuestions: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategories: [],
  isLoaded: false,
  activeCatgory: "",
  categoryQuestions: [],
  isLoadingCategoryQuestions: false,
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
      state.isLoadingCategoryQuestions = false;
    },

    resetActiveQuestions: (state) => {
      state.activeCatgory = "";
      state.categoryQuestions = [];
      state.isLoadingCategoryQuestions = false;
    },
    resetCategoryState: (state) => {
      state.selectedCategories = [];
      state.activeCatgory = "";
      state.categoryQuestions = [];
      state.isLoadingCategoryQuestions = false;
    },
    toggleLoadingQuestions: (state) => {
      state.isLoadingCategoryQuestions = !state.isLoadingCategoryQuestions;
    },
  },
});

export const { setCategories, addSelectedCategory, resetActiveQuestions, setCategoryQuestions, resetCategoryState, toggleLoadingQuestions } =
  categoriesSlice.actions;

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
      const { level, token } = getState().user;
      if (getState().categories.isLoadingCategoryQuestions) return;
      dispatch(toggleLoadingQuestions());

      const questions = await getQuestions(level, token, categoryId);
      dispatch(setCategoryQuestions({ activeCategory: categoryId, questions }));
    } catch (err) {
      console.log(err);
    }
  };

export default categoriesSlice.reducer;
