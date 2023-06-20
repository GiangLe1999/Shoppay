import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandSidebar: true,
};

export const expandSlice = createSlice({
  name: "expandSidebar",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

export const { toggleSidebar } = expandSlice.actions;

export default expandSlice.reducer;
