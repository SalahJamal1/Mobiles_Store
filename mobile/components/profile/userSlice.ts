import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
interface USERSTATE {
  auth: boolean;
  user: User;
}
const initialState: USERSTATE = {
  auth: false,
  user: {} as User,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signin(state: USERSTATE, action: PayloadAction<User>) {
      state.auth = true;
      state.user = action.payload;
    },
    refreshToken(state: USERSTATE, action: PayloadAction<User>) {
      state.auth = true;
      state.user = action.payload;
    },
    signout(state: USERSTATE) {
      state.auth = false;
      state.user = {} as User;
    },
  },
});

export default userSlice.reducer;
export const { signin, signout, refreshToken } = userSlice.actions;
