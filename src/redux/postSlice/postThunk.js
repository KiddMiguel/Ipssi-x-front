import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../utils/interceptor";

export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("forum/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("forum/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await myAxios.delete(`forum/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostsBefore = createAsyncThunk(
  "post/getPostsBefore",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const lastTimestamp = state.posts.lastTimestamp || Date.now();

      const response = await myAxios.get(`forum/before/${lastTimestamp}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Erreur inconnue");
    }
  }
);
