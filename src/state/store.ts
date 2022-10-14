import logger from 'redux-logger';
import { configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from 'components/cells/state/cellsSlice';

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddleware().concat(logger)
    }
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
