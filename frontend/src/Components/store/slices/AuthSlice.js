import { createSlice } from '@reduxjs/toolkit';

const initialCurrentUserState = {
  CurrentUser: '',
};

const AuthSlice = createSlice({
  name: 'CurrentUser',
  initialState: initialCurrentUserState,
  reducers: {
    setCurrentUser(state, action) {
      console.log('setCurrentUser reducer called with payload:', action.payload);
      state.CurrentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = AuthSlice.actions;
export const CurrentUserReducer = AuthSlice.reducer;
