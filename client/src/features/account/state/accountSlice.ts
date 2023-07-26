import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    user: {
      token: '',
      username: '',
      photoUrl: '',
      knownAs: '',
    },
    isLoggedIn: false,
  } as IAccountInitalState,
  reducers: {
    onLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      state.user.username = '';
      state.user.token = '';
      state.isLoggedIn = false;
    },
    setMainPhoto: (state, action: PayloadAction<string>) => {
      state.user.photoUrl = action.payload;
    },
    // setIsAuth: (state, action: PayloadAction<boolean>) => {
    //   state.isLoggedIn = action.payload;
    // },
  },
});

export default accountSlice.reducer;
export const { onLogin, onLogout, setMainPhoto } = accountSlice.actions;
