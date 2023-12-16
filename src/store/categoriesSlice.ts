import { instance } from "@/axios-config/instance";
import { CategoriesState } from "@/types/statesTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
   "categories/getAllCategories",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await instance.get("/api/v1/admin/categories/index");
         if (res.data.success) {
            return res.data.data.categories;
         }
      } catch (error) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

const categories = createSlice({
   name: "categories",
   initialState: {
      isLoading: false,
      error: null,
      categories: [],
   } as CategoriesState,
   reducers: {},
   extraReducers: (builder) => {
      // get all services
      builder.addCase(getAllCategories.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getAllCategories.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.categories = action.payload;
      });
      builder.addCase(getAllCategories.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default categories.reducer;
