import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from  '../../utils/interceptor';

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await myAxios.post('/api/auth/register', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await myAxios.post('/api/auth/login', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});