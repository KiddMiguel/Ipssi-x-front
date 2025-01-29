
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

export const getPosts = createAsyncThunk('post/getPosts', async ({rejectWithValue}) => {
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

export const getPostsBefore = createAsyncThunk('post/getPostsBefore', async (timestamp, { rejectWithValue }) => {
    try {
        const response = await myAxios.get(`api/forum/before/${timestamp}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});