import {  createSlice } from '@reduxjs/toolkit';
import { register, login } from './authThunk';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        isNew : false,
        user : null,
        status: 'idle',
        error: null
    },

    reducers : {
        logout : (state) => {
            state.isAuthenticated = false;
            state.isNew = false;
            state.user = null;
        }
    },
    extraReducers : (builder) => {
        // Register
        builder.addCase(register.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = 'success';
            state.isAuthenticated = true;
            state.isNew = true;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'success';
            state.isAuthenticated = true;
            state.isNew = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });

    }
});

export const { logout } = authSlice.actions;
export {register, login};
export default authSlice.reducer;

