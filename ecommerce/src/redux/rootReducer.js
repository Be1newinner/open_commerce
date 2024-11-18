import { combineReducers } from "@reduxjs/toolkit";
import product from "./reducers/productReducer";
import cart from "./reducers/cartReducer";

export const rootReducer = combineReducers({
  product,
  cart,
});
