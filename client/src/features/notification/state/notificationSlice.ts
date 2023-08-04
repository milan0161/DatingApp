import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {} as InitialOnlineUsers,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    addNewOnlineUser: (state, action: PayloadAction<string>) => {
      state.onlineUsers = [...state.onlineUsers, action.payload];
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter((x) => x !== action.payload);
    },
  },
});

export default notificationSlice.reducer;

export const { setOnlineUsers, removeUser, addNewOnlineUser } =
  notificationSlice.actions;
