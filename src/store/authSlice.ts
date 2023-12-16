import { AuthState } from "@/types/statesTypes";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: localStorage.getItem("token") ? true : false,
   } as AuthState,
   reducers: {
      login: (state) => {
         state.isLoggedIn = true;
      },
      logout: (state) => {
         state.isLoggedIn = false;
         localStorage.removeItem("token");
      },
   },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
