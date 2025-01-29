import { combineReducers } from "@reduxjs/toolkit";
import product from "./reducers/productReducer";
import cart from "./reducers/cartReducer";
import order from "./reducers/orderReducer";
import auth from "./reducers/authReducer";

export const rootReducer = combineReducers({
  product,
  cart,
  order,
  auth,
});
