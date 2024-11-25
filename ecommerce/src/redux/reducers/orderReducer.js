const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    loadOrderRequest: (state, action) => {
      console.log("ORDER REQUEST => ", action.payload);
      state.loading = true;
    },
    loadOrderSuccess: (state, action) => {
      console.log("ORDER SUCCESS => ", action.payload);

      state.loading = false;
      state.data = [...state.data, action.payload];
    },
    loadOrderFailure: (state, action) => {
      console.log("ORDER FAILURE => ", action.payload);

      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadOrderRequest, loadOrderSuccess, loadOrderFailure } =
  orderSlice.actions;

export default orderSlice.reducer;
