import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  shippingAddress: {},
  paymentMethod: "",
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
});

export default productSlice.reducer;

export const {} = productSlice.actions;
