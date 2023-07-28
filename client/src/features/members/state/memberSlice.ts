import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const MemberSlice = createSlice({
  name: 'member',
  initialState: {
    tabsetValue: 0,
  },
  reducers: {
    setTabsetValue: (state, action: PayloadAction<number>) => {
      state.tabsetValue = action.payload;
    },
  },
});

export default MemberSlice.reducer;
export const { setTabsetValue } = MemberSlice.actions;
