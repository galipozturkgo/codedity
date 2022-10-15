import { useAppDispatch } from 'state/hooks';
import bundle, { BundleOutputProps } from "bundle";
import { bindActionCreators, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from 'react';

export interface BundlesState {
  [key: string]: {
    loading: boolean;
    output: BundleOutputProps;
  } | undefined,
}

const initialState: BundlesState = {

}

interface BundleAction {
  cellId: string;
  rawCode: string;
}

export const createBundle = createAsyncThunk(
  '',
  async (payload: BundleAction): Promise<BundleOutputProps> => {
    return await bundle(payload.rawCode);
  }
);

const slice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBundle.pending, (state: BundlesState, action) => {
        const { cellId } = action.meta.arg;
        const cell = {
          loading: true,
          output: {
            code: "",
            error: ""
          }
        }
        state[cellId] = cell;
      })
      .addCase(createBundle.fulfilled, (state: BundlesState, action) => {
        const { cellId } = action.meta.arg;
        let instate = state[cellId];

        if (instate) {
          instate.output = action.payload;
          instate.loading = false;
        }
      })
      .addCase(createBundle.rejected, (state, action) => {
        const { cellId } = action.meta.arg;
        let instate = state[cellId];
        if (instate) {
          instate.output = { code: "", error: action.error.message || "" };
          instate.loading = false;
        }
      })
  }
})

export const { actions, reducer: bundlesReducer } = slice;

export const useBundleActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators({ ...actions, createBundle }, dispatch), [dispatch]);
};
