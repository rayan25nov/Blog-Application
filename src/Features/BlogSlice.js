// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: { blog: null },
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = blogSlice.actions;
export const selectBlog = (state) => state.blog.blog;
export default blogSlice.reducer;
