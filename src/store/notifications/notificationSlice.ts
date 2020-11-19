import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const today = new Date().toLocaleDateString();

const notifications = createSlice({
  name: 'notifications',
  initialState: {
    all: [],
    one: {
      id: 0,
      message: '',
      read: false,
      candidateId: 0,
      userId: 0,
      candidate: {
        id: 0,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        website: '',
        resume: '',
        createdAt: today,
        updatedAt: today,
        stageId: 0,
        position: 0,
        stage: {},
      },
    },
    loading: true,
    fail: {
      message: '',
      status: 0,
      error: false,
    },
  },
  reducers,
});

export const {
  failFetchNotifications,
  getOneNotification,
  getAllNotifications,
  removeNotification,
  removeAllNotifications,
  requestFetchNotifications,
  responseFetchNotifications,
  readOneNotification,
  unreadOneNotification,
} = notifications.actions;

export default notifications.reducer;
