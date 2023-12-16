import { configureStore } from "@reduxjs/toolkit/react";
import services from "./servicesSlice";
import products from "./productsSlice";
import auth from "./authSlice";
import categories from "./categoriesSlice";

export default configureStore({
   reducer: {
      services,
      products,
      auth,
      categories,
   },
});
