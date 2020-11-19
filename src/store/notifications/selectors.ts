import { RootState } from 'store';

export const sel_notifications = (state: RootState) =>
  state.notifications.all;
export const sel_notification = (state: RootState) =>
  state.notifications.one;
export const sel_notificationsLoading = (state: RootState) =>
  state.notifications.loading;
export const selectornotificationsFail = (state: RootState) =>
  state.notifications.fail;
