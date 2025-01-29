import { createSlice } from '@reduxjs/toolkit';
import { register, login } from './authThunk';

const loadInitialState = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        isAuthenticated: !!token,
        isNew: false,
        user: user,
        token: token,
        status: 'idle',
        error: null
    };
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: loadInitialState(),

    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.isNew = false;
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(register.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = 'success';
            state.isAuthenticated = true;
            state.isNew = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
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
            state.user = action.payload.user;
            state.token = action.payload.token;
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

