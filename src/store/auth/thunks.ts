import { AppThunk } from 'store';
import {
  requestFetchAuth,
  authenticateUser,
  failFetchAuth,
} from 'store/auth/authSlice';
import authService from 'services/auth.service';

export const login = (
  loginMs: () => Promise<string | undefined>,
  callback: () => void,
): AppThunk => async (dispatch) => {
  dispatch(requestFetchAuth(true));
  const token = await loginMs();
  authService
    .login(token as string)
    .then((res) => {
      dispatch(authenticateUser(res));
      dispatch(requestFetchAuth(false));
      window.sessionStorage.setItem('user', JSON.stringify(res));
      callback();
    })
    .catch((error) => {
      dispatch(requestFetchAuth(false));
      dispatch(
        failFetchAuth({
          message: error.statusText,
          status: error.status,
          error: true,
        }),
      );
    });
};
