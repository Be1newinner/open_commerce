const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCartRequest: (state, action) => {
      state.loading = true;
    },
    loadCartSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loadCartRequest, loadCartSuccess, loadCartFailure } =
  cartSlice.actions;

export default cartSlice.reducer;
