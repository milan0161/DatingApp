import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: { isAdmin: false } as IAdminInitialState,
  reducers: {
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export default adminSlice.reducer;

export const { setIsAdmin } = adminSlice.actions;
