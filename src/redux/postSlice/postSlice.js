import { createSlice } from '@reduxjs/toolkit';
import {getPosts, addPost, deletePost, getPostsBefore } from './postThunk';

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
        // builder.addCase(getPosts.pending, (state) => {
        //     state.status = 'loading';
        // });
        // builder.addCase(getPosts.fulfilled, (state, action) => {
        //     state.status = 'success';
        //     state.posts = action.payload;
        // });
        // builder.addCase(getPosts.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.error.message || null;
        // });

        // Delete Post
        builder.addCase(deletePost.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
				if (action.payload.length === 0) {
					state.hasMore = false;
				} else {
					state.posts = [...state.posts, ...action.payload];
					state.lastTimestamp = action.payload[action.payload.length - 1].createdAt;
				}
            });
        builder.addCase(deletePost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });


        // Get Posts Before
        builder.addCase(getPostsBefore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPostsBefore.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.length === 0) {
                state.hasMore = false;
            } else {
                state.posts = [...state.posts, ...action.payload];
                state.lastTimestamp = action.payload[action.payload.length - 1].createdAt;
            }
        });
        builder.addCase(getPostsBefore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
});

export default postSlice.reducer;
export {getPosts, addPost,  deletePost, getPostsBefore };
