import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Column } from "./types/types";

type ColumnsState = {
  columns: Column[];
};

type SwapColumns = { activeColumn: Column; overColumn: Column };

const initialState: ColumnsState = {
  columns: [],
};

const columnsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<string>) => {
      const isExist = state.columns.some(
        (column) => column.title === action.payload
      );
      if (!isExist) {
        state.columns = [
          ...state.columns,
          {
            id: Date.now(),
            title: action.payload,
          },
        ];
      }
    },

    changeTitle: (state, action: PayloadAction<Column>) => {
      state.columns = state.columns.map((board) => {
        if (board.id === action.payload.id) {
          return {
            ...board,
            title: action.payload.title,
          };
        }
        return board;
      });
    },

    swapColumns: (state, action: PayloadAction<SwapColumns>) => {
      const { activeColumn, overColumn } = action.payload;
      const activeColumnIndex = state.columns.findIndex((column) => column.id === activeColumn.id);
      const overColumnIndex = state.columns.findIndex((column) => column.id === overColumn.id);
      state.columns = state.columns.map((board, index) => {
        if (index === overColumnIndex) {
          return activeColumn;
        }
        if (index === activeColumnIndex) {
          return overColumn;
        }
        return board;
      });
    },
  },
});

export const { addColumn, changeTitle, swapColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
