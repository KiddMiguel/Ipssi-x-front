import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from  '../../utils/interceptor';

export const register = createAsyncThunk('auth/register', async (data) => {
    const response = await myAxios.post('/api/register', data);
    return response.data;
});

export const login = createAsyncThunk('auth/login', async (data) => {
    const response = await myAxios.post('/api/login', data);
    return response.data;
});