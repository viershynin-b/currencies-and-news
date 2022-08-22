import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import * as Types from "../models/Types";

interface IReducedUser {
  email: string;
  password: string;
}

interface IInitAuthState {
  userList: IReducedUser[];
  isLoggedIn: boolean;
  status: string;
}

const serverStatus = sessionStorage.getItem("isUserAuthenticated");

const status = serverStatus ? true : false;

const initialState: IInitAuthState = {
  userList: [
    {
      email: "",
      password: "",
    },
  ],
  isLoggedIn: status || false,
  status: "",
};

export const fetchUser = createAsyncThunk(
  "auth/fetchPosts",
  async (): Promise<Types.IUserList[]> => {
    const response = await axios("https://jsonplaceholder.typicode.com/users");
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogInLogOut(state) {
      state.isLoggedIn = !state.isLoggedIn;
      state.isLoggedIn
        ? sessionStorage.setItem(
            "isUserAuthenticated",
            JSON.stringify(state.isLoggedIn)
          )
        : sessionStorage.removeItem("isUserAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const reducedData = action.payload.map((user) => ({
        email: user.email,
        password: user.address.street,
      }));
      state.userList = reducedData;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "rejected";
      // add catch error logic
    });
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
