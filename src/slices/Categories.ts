import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCateories } from "../lib/categories";
import { AppThunk } from "../store/index";
import { Category } from "../types/Category";

interface CategoriesState {
  categories: Category[];
  selectedCategories: string[];
  isLoaded: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategories: [],
  isLoaded: false,
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
  },
});

export const { setCategories, addSelectedCategory } = categoriesSlice.actions;

export const fetchSliceCategories =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    if (getState().categories.categories.length > 0) return;
    const categories = await getCateories();
    dispatch(setCategories(categories));
  };

export default categoriesSlice.reducer;
