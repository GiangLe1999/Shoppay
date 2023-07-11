import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMobileCate: false,
};

export const mobileCateSlice = createSlice({
  name: "showMobileCate",
  initialState,
  reducers: {
    toggleMobileCate(state, action) {
      state.showMobileCate = !state.showMobileCate;
    },
  },
});

export const { toggleMobileCate } = mobileCateSlice.actions;

export default mobileCateSlice.reducer;
