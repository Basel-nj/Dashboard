import { instance } from "@/axios-config/instance";
import { ProductsState } from "@/types/statesTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoryId } from "@/utils/getCategoryId";

export const getProduct = createAsyncThunk(
   "products/getProduct",
   async (
      params: { product: string; perPage: number; activePage: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      const { product, perPage, activePage } = params;
      let category_id: number = getCategoryId(product);
      try {
         const res = await instance.get(
            `/api/v1/admin/products/index?filter[category_id]=${category_id}&page=${activePage}&perPage=${perPage}`
         );
         if (res.data.success) {
            return { data: res.data.data.products, count: res.data.data.count };
         }
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const addProduct = createAsyncThunk(
   "products/addProduct",
   async (data: any, thunkAPI) => {
      const { rejectWithValue, dispatch } = thunkAPI;
      try {
         const res = await instance.post("api/v1/admin/products/store", data);
         if (res.data.success) {
            dispatch(addProductClientSide(res.data.data));
            return res.data.data;
         }
      } catch (error) {
         console.error("Error:", error);
         return rejectWithValue(error);
      }
   }
);
export const editProduct = createAsyncThunk(
   "products/editProduct",
   async (params: { data: any; serviceId: number }, thunkAPI) => {
      const { rejectWithValue, dispatch } = thunkAPI;
      const { data, serviceId } = params;
      try {
         const res = await instance.post(
            `/api/v1/admin/products/update/${serviceId}`,
            data
         );
         if (res.data.success) {
            console.log(res.data);
            dispatch(
               editProductClientSide({
                  data: res.data.data,
                  serviceId,
               })
            );
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const products = createSlice({
   name: "products",
   initialState: {
      isLoading: false,
      error: null,
      products: [],
      count: 0,
      isSuccessed: false,
      loadingChange: false,
   } as ProductsState,
   reducers: {
      completed: (state) => {
         state.isSuccessed = false;
      },
      addProductClientSide: (state, action) => {
         state.products = [action.payload, ...state.products];
         state.count = state.count + 1;
      },
      editProductClientSide: (state, action) => {
         const id = action.payload.serviceId;
         const newProducts = state.products.map((product) => {
            if (product.id === id) {
               return action.payload.data;
            }
            return product;
         });
         state.products = newProducts;
      },
   },
   extraReducers: (builder) => {
      // get all products
      builder.addCase(getProduct.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getProduct.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.products = action.payload && action.payload.data;
         state.count = action.payload && action.payload.count;
      });
      builder.addCase(getProduct.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // add all products
      builder.addCase(addProduct.pending, (state) => {
         state.error = null;
         state.loadingChange = true;
      });
      builder.addCase(addProduct.fulfilled, (state) => {
         state.error = null;
         state.loadingChange = false;
         state.isSuccessed = true;
      });
      builder.addCase(addProduct.rejected, (state, action: any) => {
         state.loadingChange = false;
         state.isSuccessed = false;
         state.error = action.payload;
      });
      // edit all products
      builder.addCase(editProduct.pending, (state) => {
         state.error = null;
         state.loadingChange = true;
      });
      builder.addCase(editProduct.fulfilled, (state) => {
         state.error = null;
         state.loadingChange = false;
         state.isSuccessed = true;
      });
      builder.addCase(editProduct.rejected, (state, action: any) => {
         state.loadingChange = false;
         state.isSuccessed = false;
         state.error = action.payload;
      });
   },
});

export const { completed, addProductClientSide, editProductClientSide } =
   products.actions;

export default products.reducer;
