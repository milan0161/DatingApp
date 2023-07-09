import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: {
      token: "",
      username: "",
    },
    isLoggedIn: false,
  } as IAccountInitalState,
  reducers: {
    onLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      state.user.username = "";
      state.user.token = "";
      state.isLoggedIn = false;
    },
  },
});

export default accountSlice.reducer;
export const { onLogin, onLogout } = accountSlice.actions;
