import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"

type dndType = {
  isDisable: boolean
}

const initialState: dndType = {
  isDisable: false,
};

const dndSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    toggleDndDisabled: (state) => {
      state.isDisable = !state.isDisable
    }
  },
});

export const { toggleDndDisabled } = dndSlice.actions;

export default dndSlice.reducer;
