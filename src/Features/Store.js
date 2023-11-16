// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./ToggleModeSlice";

const store = configureStore({
  reducer: {
    toggleMode: ToggleModeReducer,
  },
});

export default store;
