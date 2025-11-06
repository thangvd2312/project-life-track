import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default slice.reducer;
