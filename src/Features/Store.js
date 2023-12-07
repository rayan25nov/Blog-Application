// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import ToggleModeReducer from "./ToggleModeSlice";
import UserReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    toggleMode: ToggleModeReducer,
    user: UserReducer,
  },
});

export default store;
