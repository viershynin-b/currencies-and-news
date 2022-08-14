import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Types from "../models/Types";
import { API_KEY_NEWS as API_KEY } from "../GLOBAL_VARS";

import axios from "axios";

interface IAPIrequest {
  status: string;
  totalResults: number;
  articles: Types.INewsPosts[];
}

interface IInitNewsState {
  newsList: Types.INewsPosts[];
  status: string;
}

const initialState: IInitNewsState = {
  newsList: [
    {
      source: {
        id: "",
        name: "",
      },
      author: "",
      title: "",
      description: "",
      url: "",
      urlToImage: "",
      publishedAt: "",
      content: "",
    },
  ],
  status: "",
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (): Promise<IAPIrequest> => {
    const response = await axios(
      `https://newsapi.org/v2/everything?q=Apple&from=2022-08-05&sortBy=popularity&apiKey=${API_KEY}`
    );
    return response.data;
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addPosts(state, action) {
      state.newsList = action.payload.splice(0, 30);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.newsList = action.payload.articles.splice(0, 30);
      localStorage.setItem(
        "news",
        JSON.stringify(action.payload.articles.splice(0, 30))
      );
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export const newsActions = newsSlice.actions;

export default newsSlice.reducer;
