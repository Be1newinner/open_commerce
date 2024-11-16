import { combineReducers } from "@reduxjs/toolkit";
import product from "./reducers/productReducer";

export const rootReducer = combineReducers({
  product,
});
