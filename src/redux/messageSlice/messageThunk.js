import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../utils/interceptor';


export const getConversation = createAsyncThunk(
    'message/getConversation',
    async (receiverId) => {
        const response = await myAxios.get(`/conversation/${receiverId}`);
        return response.data;
    }
);