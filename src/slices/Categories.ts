import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCateories } from "../lib/categories";
import { AppThunk } from "../store/index";
import { Category } from "../types/Category";

interface CategoriesState {
  categories: Category[];
  selectedCategorys: string[];
  isLoaded: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  selectedCategorys: [],
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
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategorys = [...state.selectedCategorys, action.payload];
    },
  },
});

export const { setCategories, setSelectedCategory } = categoriesSlice.actions;

export const fetchSliceCategories =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    if (getState().categories.categories.length > 0) return;
    const categories = await getCateories();
    console.log("🚀 ~ file: Categories.ts ~ line 89 ~ categories", categories);
    dispatch(setCategories(categories));
  };

export const addSelectedCategory =
  (categoryId: string): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    dispatch(setSelectedCategory(categoryId));
  };

export default categoriesSlice.reducer;
