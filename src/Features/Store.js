// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./ToggleModeSlice";
import BlogReducer from "./BlogSlice";

const store = configureStore({
  reducer: {
    toggleMode: ToggleModeReducer,
    blog: BlogReducer,
  },
});

export default store;
