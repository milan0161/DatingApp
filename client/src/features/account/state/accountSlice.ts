import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLoggedIn: false,
  } as IAccountInitalState,
  reducers: {
    onLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export default accountSlice.reducer;
export const { onLogin } = accountSlice.actions;
