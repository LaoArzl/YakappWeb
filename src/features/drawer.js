import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: { value: true },
  reducers: {
    toggle: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = drawerSlice.actions;

export default drawerSlice.reducer;
