import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  orderSuccess: [],
  loading: false,
  error: null,
  tax: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const foundItem = state.data.find(item => item.sku === action.payload.sku);

      if (!foundItem) {
        console.log("state: ",state.data);
        
        state.data.push({
          ...action.payload,
          quantity: 1 // New items start with quantity 1
        });
      } else {
        foundItem.quantity += 1;
      }
      console.log("state 2: ",state.data);
      console.log("action: ",action.payload);
        

      // Update total price and tax
      state.totalPrice = state.data.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.tax = (state.totalPrice * 10) / 100; // 10% tax

      console.log("Updated State:", state);
    },

    increaseQuantity: (state, action) => {
      const foundItem = state.data.find(item => item.sku === action.payload.sku);
      if (foundItem) {
        foundItem.quantity += 1;

        // Update total price and tax
        state.totalPrice = state.data.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.tax = (state.totalPrice * 10) / 100; // Update tax
      }
    },

    decreaseQuantity: (state, action) => {
      const foundItem = state.data.find(item => item.sku === action.payload.sku);
      if (foundItem && foundItem.quantity > 0) {
        foundItem.quantity -= 1;

        // If quantity reaches zero, remove the item from the cart
        if (foundItem.quantity === 0) {
          state.data = state.data.filter(item => item.sku !== action.payload.sku);
        }

        // Update total price and tax
        state.totalPrice = state.data.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.tax = (state.totalPrice * 10) / 100; // Update tax
      }
    },

    RemoveCart: (state, action) => {
      const filteredData = state.data.filter(item => item.sku !== action.payload);
      state.data = filteredData;

      // Update total price and tax after removal
      state.totalPrice = filteredData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.tax = (state.totalPrice * 10) / 100; // Update tax
    },

    orderDetailsRequest: (state, action) => {
      console.warn("ORDER REQUEST CURRENT => ", action.payload);
      state.loading = true;
    },

    orderDetailsSuccess: (state, action) => {
      console.warn("ORDER SUCCESS Current => ", action.payload);
      state.loading = false;
      state.orderSuccess = action.payload;
    },

    orderDetailsFailure: (state, action) => {
      console.warn("ORDER FAILURE current => ", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  AddCart,
  RemoveCart,
  increaseQuantity,
  decreaseQuantity,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFailure,
} = cartSlice.actions;

export default cartSlice.reducer;