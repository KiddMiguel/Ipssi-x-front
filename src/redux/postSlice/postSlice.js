import { createSlice } from "@reduxjs/toolkit";
import { addPost, getPosts, deletePost, getPostsBefore } from "./postThunk";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    lastTimestamp: null,
    hasMore: true,
    loading: "idle",
    error: null,
  },
  reducers: {
    resetForum: (state) => {
      state.posts = [];
      state.lastTimestamp = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    // Add Post
    builder.addCase(addPost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = "success";
      state.posts.unshift(action.payload);
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || null;
    });

    // Get Posts
    builder.addCase(getPosts.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = "success";
      if (action.payload.length === 0) {
        state.hasMore = false;
      } else {
        state.posts = [...state.posts, ...action.payload];
        state.lastTimestamp =
          action.payload[action.payload.length - 1].createdAt;
      }
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || null;
    });

    // Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = "success";
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || null;
    });

    // Get Posts Before
    builder.addCase(getPostsBefore.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getPostsBefore.fulfilled, (state, action) => {
      state.loading = "success";
      if (action.payload.length === 0) {
        state.hasMore = false;
      } else {
        state.posts = [...state.posts, ...action.payload];
        state.lastTimestamp =
          action.payload[action.payload.length - 1].createdAt;
      }
    });
    builder.addCase(getPostsBefore.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || null;
    });
  },
});
export const { resetForum } = postSlice.actions;

export default postSlice.reducer;
export { addPost, getPosts, deletePost, getPostsBefore };
