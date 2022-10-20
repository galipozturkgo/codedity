import axios from 'axios';
import { RootState } from 'state/store';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { bindActionCreators, createAsyncThunk, createListenerMiddleware, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

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
  order: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CellsState = {
  data: {},
  order: [],
  loading: false,
  error: null,
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

export const fetchCells = createAsyncThunk(
  "fetchCells",
  async (): Promise<Cell[]> => {
    const { data } = await axios.get("http://localhost:3095/cells");
    return data;
  }
);

export const saveCells = createAsyncThunk(
  "saveCells",
  async (_, action) => {
    const { cells: { data, order } } = action.getState() as RootState;
    const cells = order.map(id => data[id]);
    await axios.post("http://localhost:3095/cells", { cells });
  }
)

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
      const cell: Cell = { id: randomId(), content: "", type: type };
      state.data[cell.id] = cell;
      const index = state.order.findIndex(orderedId => orderedId === id);
      if (index < 0) state.order.push(cell.id);
      else state.order.splice(index, 0, cell.id);
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex(orderedId => orderedId === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCells.pending, (state) => {
        state.error = null;
        state.loading = true;
      }
      )
      .addCase(fetchCells.fulfilled, (state, action) => {
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as { [key: string]: Cell });
        state.order = action.payload.map(cell => cell.id);
        state.loading = false;
      })
      .addCase(fetchCells.rejected, (state, action) => {
        state.error = action.error.message || "";
        state.loading = false;
      })
      .addCase(saveCells.rejected, (state, action) => {
        state.error = action.error.message || "";
      })
  }
})

export const { actions, reducer: cellsReducer } = slice;

export const cellsActionListener = createListenerMiddleware()
let timer: any;
cellsActionListener.startListening({
  matcher: isAnyOf(actions.updateCell, actions.deleteCell, actions.insertCell, actions.moveCell),
  effect: async (_, listenerApi) => {
    listenerApi.cancelActiveListeners();
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      listenerApi.dispatch(saveCells());
    }, 750);
  }
});

export const useCellsActions = () => bindActionCreators({ ...actions, fetchCells, saveCells }, useAppDispatch());
