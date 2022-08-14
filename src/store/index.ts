import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";
import newsSlice from "./news-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
