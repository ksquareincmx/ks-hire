import { RootState } from 'store';

export const sel_usersData = (state: RootState) => state.users.data;
export const sel_userData = (state: RootState) => state.users.one;
export const sel_usersLoading = (state: RootState) =>
  state.users.loading;
export const sel_usersFail = (state: RootState) => state.users.fail;
export const sel_edit_success = (state: RootState) =>
  state.users.successfulEdit;
