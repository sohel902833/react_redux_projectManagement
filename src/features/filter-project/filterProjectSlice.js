import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const filterProjectSlice = createSlice({
  name: "filterProject",
  initialState,
  reducers: {
    setFilterText: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export default filterProjectSlice.reducer;
export const { setFilterText } = filterProjectSlice.actions;
