import { AppThunk } from 'store';
import { INotification } from 'modules/Users/typings';
import {
  failFetchNotifications,
  getAllNotifications,
  removeNotification,
  removeAllNotifications,
  requestFetchNotifications,
  responseFetchNotifications,
  readOneNotification,
  unreadOneNotification,
} from 'store/notifications/notificationSlice';
import notificationService from 'services/notifications.service';

export const deleteNotification = (id: number): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchNotifications());
    await notificationService.deleteOne(id);
    dispatch(removeNotification(id));
  } catch (err) {
    dispatch(
      failFetchNotifications({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotifications());
  }
};

export const deleteAllNotifications = (
  id: string,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchNotifications());
    await notificationService.deleteAll(id);
    dispatch(removeAllNotifications());
  } catch (err) {
    dispatch(
      failFetchNotifications({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotifications());
  }
};

export const readNotification = (id: number): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchNotifications());
    const notification: INotification = await notificationService.read(
      id,
    );
    dispatch(readOneNotification(notification));
  } catch (err) {
    dispatch(
      failFetchNotifications({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  }
  dispatch(responseFetchNotifications());
};

export const unreadNotification = (id: number): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchNotifications());
    const notification: INotification = await notificationService.unread(
      id,
    );
    dispatch(unreadOneNotification(notification));
  } catch (err) {
    dispatch(
      failFetchNotifications({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  }
  dispatch(responseFetchNotifications());
};

export const getNotifications = (): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchNotifications());
    const notifications: INotification[] = await notificationService.getAll();
    dispatch(getAllNotifications(notifications));
  } catch (err) {
    dispatch(
      failFetchNotifications({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  }
  dispatch(responseFetchNotifications());
};
