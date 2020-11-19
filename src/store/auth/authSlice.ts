import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    loadingAuth: true,
    isAuthenticated: false,
    data: null,
    avatar: '',
    fail: {
      message: '',
      status: 200,
      error: false,
    },
  },
  reducers,
});

export const {
  requestFetchAuth,
  authenticateUser,
  failFetchAuth,
  isAuthenticatedAuth,
  profilePicture,
} = authSlice.actions;

export default authSlice.reducer;
