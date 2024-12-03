const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
  orderSuccess: [],
  loading: false,
  error: null,
  quantity: 0,
  tax: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: (state, action) => {
      const foundItem = state.data.find(
        (item) => item.id === action.payload.id
      );

      if (!foundItem) {
        state.data.push(action.payload);
        state.quantity += 1;
      } else {
        state.quantity += 1;
      }

      state.tax = (state.totalPrice * 10) / 100;

      state.totalPrice = state.data.reduce(
        (total, item) => total + item.price * state.quantity,
        0
      );
    },

    increaseQuantity: (state, action) => {
      state.quantity += 1;
      state.totalPrice = state.data.reduce(
        (total, item) => total + item.price * state.quantity,
        0
      );
    },

    decreaseQuantity: (state, action) => {
      if (state.quantity === 0) return;
      state.quantity -= 1;
      state.totalPrice = state.data.reduce(
        (total, item) => total + item.price * state.quantity,
        0
      );
    },

    RemoveCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      state.totalPrice = state.data.reduce(
        (total, item) => total + item.price * state.quantity,
        0
      );
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
  totalPrice,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
