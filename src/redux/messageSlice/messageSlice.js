import { createSlice } from '@reduxjs/toolkit';
import { getConversation } from './messageThunk';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        conversations: [],
        currentConversation: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearConversation: (state) => {
            state.conversations = [];
            state.status = 'idle';
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getConversation.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getConversation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentConversation = action.payload;
        });
        builder.addCase(getConversation.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
    }
});

export const { clearConversation } = messageSlice.actions;
export default messageSlice.reducer;
export { getConversation };