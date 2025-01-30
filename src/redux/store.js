import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import postReducer from "./postSlice/postSlice";
import authPersistMiddleware from "./middleware/authPersistMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authPersistMiddleware);

export default store;
