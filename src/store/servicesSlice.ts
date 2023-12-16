import { instance } from "@/axios-config/instance";
import { ServicesState } from "@/types/statesTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllServices = createAsyncThunk(
   "services/getAllServices",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await instance.get("/api/v1/admin/services/index");
         if (res.data.success) {
            return res.data.data.services;
         }
      } catch (error) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

const services = createSlice({
   name: "services",
   initialState: {
      isLoading: false,
      error: null,
      services: [],
   } as ServicesState,
   reducers: {},
   extraReducers: (builder) => {
      // get all services
      builder.addCase(getAllServices.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getAllServices.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.services = action.payload;
      });
      builder.addCase(getAllServices.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default services.reducer;
