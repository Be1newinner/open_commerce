const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadAllProductRequest: (state, action) => {
      console.log("SAGA REQUEST => ", action.payload);
      state.loading = true;
    },
    loadAllProductSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadAllProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadSingleProductRequest: (state, action) => {
      console.log("SAGA REQUEST => ", action.payload);
      state.loading = true;
    },
    loadSingleProductSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loadSingleProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadAllProductRequest,
  loadAllProductSuccess,
  loadAllProductFailure,
  loadSingleProductRequest,
  loadSingleProductSuccess,
  loadSingleProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
