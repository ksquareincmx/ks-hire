import { PayloadAction } from '@reduxjs/toolkit';
import { INotification } from 'modules/Users/typings';
import { IFetchError } from 'store/typings';

type State = {
  all: INotification[];
  one: INotification;
  loading: boolean;
  fail: IFetchError;
};

export const getAllNotifications = (
  state: State,
  action: PayloadAction<INotification[]>,
) => {
  state.all = action.payload as INotification[];
};

export const getOneNotification = (
  state: State,
  action: PayloadAction<INotification>,
) => {
  state.one = action.payload;
};
export const failFetchNotifications = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};
export const removeNotification = (
  state: State,
  action: PayloadAction<number>,
) => {
  state.all = state.all.filter(
    (notification) => notification.id !== action.payload,
  );
};
export const removeAllNotifications = (state: State) => {
  state.all = [];
};
export const readOneNotification = (
  state: State,
  action: PayloadAction<INotification>,
) => {
  state.all[
    state.all.indexOf(
      state.all.filter(
        (notification: INotification) =>
          notification.id === action.payload.id,
      )[0],
    )
  ] = action.payload;
  state.one = action.payload;
};

export const unreadOneNotification = (
  state: State,
  action: PayloadAction<INotification>,
) => {
  state.all[
    state.all.indexOf(
      state.all.filter(
        (notification: INotification) =>
          notification.id === action.payload.id,
      )[0],
    )
  ] = action.payload;
  state.one = action.payload;
};
export const requestFetchNotifications = (state: State) => {
  state.loading = true;
};

export const responseFetchNotifications = (state: State) => {
  state.loading = false;
};

export default {
  // addNotification,
  failFetchNotifications,
  getOneNotification,
  getAllNotifications,
  removeNotification,
  removeAllNotifications,
  requestFetchNotifications,
  responseFetchNotifications,
  readOneNotification,
  unreadOneNotification,
};
