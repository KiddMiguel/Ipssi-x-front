import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts, deletePost, getPostsBefore } from './postThunk';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        hasMore: true,
        loading : false,
        lastTimestamp: null,
        status: 'idle',
        error: null
    },
    reducers: {
        resetPosts: (state) => {
            state.posts = [];
            state.hasMore = true;
            state.loading = false;
            state.lastTimestamp = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Add Post
        builder.addCase(addPost.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.status = 'success';
            state.posts.unshift(action.payload);
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });

        // Get Posts
        builder.addCase(getPosts.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.status = 'success';
            state.posts = action.payload;
        });
        builder.addCase(getPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });

        // Delete Post
        builder.addCase(deletePost.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.status = 'success';
            state.posts = state.posts.filter(post => post._id !== action.payload);
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });


        // Get Posts Before
        builder.addCase(getPostsBefore.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getPostsBefore.fulfilled, (state, action) => {
            state.status = 'success';
            state.posts.push(...action.payload);
        });
        builder.addCase(getPostsBefore.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
    }
});

export default postSlice.reducer;
export { addPost, getPosts, deletePost, getPostsBefore };
