import { useAppDispatch } from 'state/hooks';
import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";

type CellType = "code" | "text";

type MoveDirection = "up" | "down";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export interface CellsState {
  data: {
    [key: string]: Cell;
  },
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {
    "test": {
      id: "test",
      content: "",
      type: "text",
    }
  },
  loading: false,
  error: null,
  order: ["test"],
}

interface UpdateCellAction {
  id: string;
  content: string;
}

interface DeleteCellAction {
  id: string;
}

interface InsertCellAction {
  id: string | null;
  type: CellType;
}

interface MoveCellAction {
  id: string;
  direction: MoveDirection;
}

const randomId = () => Math.random().toString(36).substring(2, 5);

const slice = createSlice({
  name: 'cell',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<DeleteCellAction>) => {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter(orderedId => orderedId !== id);
    },
    insertCell: (state, action: PayloadAction<InsertCellAction>) => {
      const { id, type } = action.payload;
      const cell: Cell = {
        id: randomId(),
        content: "",
        type: type,
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex(orderedId => orderedId === id);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex(orderedId => orderedId === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
    fetchCells: (state) => {

    },
  },
})

export const { actions, reducer: cellsReducer } = slice;

export const useCellsActions = () => bindActionCreators(actions, useAppDispatch());
