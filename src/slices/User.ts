import { Level } from "./../types/Level";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/index";
import { getUserToken } from "src/lib/api";

interface UserState {
  name: string;
  level: Level;
  token: string;
}

const initialState: UserState = {
  name: "",
  level: Level.easy,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; level: Level }>) => {
      state.name = action.payload.name;
      state.level = action.payload.level;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetUser: (state): void => {
      state.level = Level.easy;
      state.name = "";
      state.token = "";
    },
  },
});

export const { setUser, setUserToken } = userSlice.actions;

export const addUserToken =
  (): AppThunk =>
  async (dispatch, getState): Promise<void> => {
    if (getState().user.token) return;
    const token = await getUserToken();
    dispatch(setUserToken(token));
  };

export default userSlice.reducer;
