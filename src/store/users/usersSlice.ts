import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';
const today = new Date().toLocaleDateString();

const usersSilce = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    data: [],
    one: {
      id: '0',
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: '',
      password: '',
      roleId: 0,
      createdAt: today,
      updatedAt: today,
    },
    successfulEdit: {
      message: '',
      success: false,
    },
    fail: {
      message: '',
      status: 200,
      error: false,
    },
  },
  reducers,
});

export const {
  failFetchUsers,
  getAllUsers,
  getOneUser,
  editOneUser,
  removeUser,
  requestFetchUsers,
  responseFetchUsers,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} = usersSilce.actions;

export default usersSilce.reducer;
