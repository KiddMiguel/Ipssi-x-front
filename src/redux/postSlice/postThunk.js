import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../utils/interceptor';

export const addPost = createAsyncThunk('post/addPost', async (data, { rejectWithValue }) => {
    try {
        const response = await myAxios.post('api/forum/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getPosts = createAsyncThunk('post/getPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await myAxios.get('api/forum/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deletePost = createAsyncThunk('post/deletePost', async (id, { rejectWithValue }) => {
    try {
        await myAxios.delete(`api/forum/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getPostsBefore = createAsyncThunk('post/getPostsBefore', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        const lastTimestamp = state.post.lastTimestamp || Date.now();
        const limit = 10; // Nombre de posts à charger par requête

        const response = await myAxios.get(`api/forum/before/${lastTimestamp}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log('error', error);
        return rejectWithValue(error.response.data);
    }
});

// export const fetchPosts = createAsyncThunk(
// 	'forum/fetchPosts',
// 	async (_, { getState, rejectWithValue }) => {
// 		try {
// 			const state = getState();
// 			const lastTimestamp = state.forum.lastTimestamp || Date.now();

// 			const response = await myAxios.get(`/api/forum/before/${lastTimestamp}`);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data || 'Erreur inconnue');
// 		}
// 	 }
// );