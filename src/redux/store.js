import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import postReducer from "./postSlice/postSlice";
import authPersistMiddleware from "./middleware/authPersistMiddleware";
import messageReducer from "./messageSlice/messageSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        message : messageReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authPersistMiddleware)
});

export default store;
