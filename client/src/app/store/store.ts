import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSLice';
import accountSlice from '../../features/account/state/accountSlice';
import memberSlice from '../../features/members/state/memberSlice';
import adminSlice from '../../features/admin/state/adminSlice';
import notificationSlice from '../../features/notification/state/notificationSlice';
import messagesSlice from '../../features/messages/state/messagesSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    account: accountSlice,
    member: memberSlice,
    admin: adminSlice,
    notification: notificationSlice,
    message: messagesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
