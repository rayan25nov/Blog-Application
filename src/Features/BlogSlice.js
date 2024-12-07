import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    deleteBlog: (state, action) =>
      state.filter((post) => post._id !== action.payload),
  },
});

export const { setBlogs, deleteBlog } = blogSlice.actions;
export const selectBlog = (state) => state.blog;
export default blogSlice.reducer;
