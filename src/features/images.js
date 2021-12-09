import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    value: [],
  },
  reducers: {
    updateImage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateImage } = imageSlice.actions;

export default imageSlice.reducer;
