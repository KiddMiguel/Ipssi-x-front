import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import postReducer from "./postSlice/postSlice";
import authPersistMiddleware from "./middleware/authPersistMiddleware";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authPersistMiddleware)
});

export default store;
