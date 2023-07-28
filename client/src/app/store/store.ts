import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSLice';
import accountSlice from '../../features/account/state/accountSlice';
import memberSlice from '../../features/members/state/memberSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    account: accountSlice,
    member: memberSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
