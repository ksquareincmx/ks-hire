import { PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserListing } from 'modules/Users/typings';
import { IFetchError } from 'store/typings';

type SuccessfulEdit = {
  message: string;
  success: boolean;
};

type State = {
  loading: boolean;
  one: IUser;
  data: IUserListing[];
  fail: IFetchError;
  successfulEdit: SuccessfulEdit;
};

export const getAllUsers = (
  state: State,
  action: PayloadAction<IUserListing[]>,
) => {
  state.data = action.payload;
};

export const getOneUser = (
  state: State,
  action: PayloadAction<IUser>,
) => {
  state.one = action.payload;
};

export const editOneUser = (
  state: State,
  action: PayloadAction<IUser>,
) => {
  state.one = action.payload;
};

export const failFetchUsers = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};

export const removeUser = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.data = state.data.filter(
    (user) => user.id !== action.payload,
  );
};

export const requestFetchUsers = (state: State) => {
  state.loading = true;
};

export const responseFetchUsers = (state: State) => {
  state.loading = false;
};

export const beginEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};
export const endEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};
export const errorEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};
export const successfulEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};

export default {
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
};
