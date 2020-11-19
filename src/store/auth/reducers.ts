import { PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from 'modules/Auth/typings';
import { IFetchError } from '../typings';

type State = {
  loading: boolean;
  data: IAuth | null;
  fail: IFetchError;
  isAuthenticated: boolean;
  loadingAuth: boolean;
  avatar: string;
};

export const requestFetchAuth = (
  state: State,
  action: PayloadAction<boolean>,
) => {
  state.loading = action.payload;
};

export const authenticateUser = (
  state: State,
  action: PayloadAction<IAuth>,
) => {
  state.data = action.payload;
};

export const failFetchAuth = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.fail = action.payload;
};

export const isAuthenticatedAuth = (
  state: State,
  action: PayloadAction<boolean>,
) => {
  state.isAuthenticated = action.payload;
  state.loadingAuth = false;
};

export const profilePicture = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.avatar = action.payload;
};

export default {
  requestFetchAuth,
  authenticateUser,
  failFetchAuth,
  isAuthenticatedAuth,
  profilePicture,
};
