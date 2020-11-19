import { RootState } from 'store';

export const selectorAuthData = (state: RootState) => state.auth.data;
export const selectorAuthLoading = (state: RootState) =>
  state.auth.loading;
export const selectorAuthFail = (state: RootState) => state.auth.fail;
export const selectorisAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectorLoadingAuth = (state: RootState) =>
  state.auth.loadingAuth;
export const selectorProfilePicture = (state: RootState) =>
  state.auth.avatar;
