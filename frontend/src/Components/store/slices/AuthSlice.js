import { createSlice } from '@reduxjs/toolkit';

const initialCurrentUserState = {
  CurrentUser: null,
};

const AuthSlice = createSlice({
  name: 'CurrentUser',
  initialState: initialCurrentUserState,
  reducers: {
    setCurrentUser:(state, action) =>{
      console.log('setCurrentUser reducer called with payload:', action.payload);
      state.CurrentUser = action.payload;
    },
    clearInfo: (state,action) => {
      console.log(action)
      state.CurrentUser =null;
    },
  },
});

export const { setCurrentUser,clearInfo } = AuthSlice.actions;
export const CurrentUserReducer = AuthSlice.reducer;
