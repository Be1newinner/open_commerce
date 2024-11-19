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
    AddCart: (state, action) => {
      state.data.push(action.payload);
    },

    RemoveCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { AddCart, RemoveCart } =
  cartSlice.actions;

export default cartSlice.reducer;
