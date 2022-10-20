import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { bundlesReducer } from 'bundle/state/bundlesSlice';
import { cellsReducer, cellsActionListener } from 'components/cells/state/cellsSlice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
    bundles: bundlesReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(cellsActionListener.middleware)
      .concat(logger);
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
