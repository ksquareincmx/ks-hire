import { AppThunk } from 'store';
import { IUser } from 'modules/Users/typings';
import {
  failFetchUsers,
  getAllUsers,
  getOneUser,
  removeUser,
  requestFetchUsers,
  responseFetchUsers,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} from 'store/users/usersSlice';
import userService from 'services/users.service';

/* export const addNewUser = (
  User: IUser,
  cb: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(beginEdit());
    await userService.addNew(User);
    dispatch(
      successfulEdit({
        message: 'Created Successfuly',
        success: true,
      }),
    );
    cb();
  } catch (err) {
    dispatch(
      errorEdit({
        message:
          err.status === 403
            ? 'Email already in use'
            : 'Error Creating User',
        success: false,
      }),
    );
  } finally {
    dispatch(endEdit());
  }
}; */

export const deleteUser = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchUsers());
    await userService.deleteOne(id);
    dispatch(removeUser(id));
  } catch (err) {
    dispatch(
      failFetchUsers({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchUsers());
  }
};

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchUsers());
    const users = await userService.getAll();
    dispatch(getAllUsers(users));
  } catch (err) {
    dispatch(
      failFetchUsers({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchUsers());
  }
};

export const getUser = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchUsers());
    const user = await userService.getById(id);
    dispatch(getOneUser(user));
  } catch (err) {
    dispatch(
      failFetchUsers({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchUsers());
  }
};

export const editUser = (
  id: string,
  user: IUser,
  cb: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(beginEdit());
    await userService.editOne(id, user);
    //reset redux user
    dispatch(
      getOneUser({
        id: '0',
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: '',
        password: '',
        roleId: 0,
      }),
    );
    dispatch(
      successfulEdit({
        message: 'Edit Successful',
        success: true,
      }),
    );
    cb();
  } catch (e) {
    dispatch(errorEdit({ message: e, success: false }));
  }
  dispatch(endEdit());
};
