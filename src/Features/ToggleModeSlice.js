import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const ToggleModeSlice = createSlice({
  name: "toggleMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = ToggleModeSlice.actions;

export const selectDarkMode = (state) => state.toggleMode.darkMode;
export default ToggleModeSlice.reducer;
