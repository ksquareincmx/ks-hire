import {
  configureStore,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authReducers from './auth/authSlice';
import candidatesReducer from './candidates/candidatesSlice';
import documentReducer from './documents/documentSlice';
import feedbacksReducer from './feedbacks/feedbacksSlice';
import jobsReducer from './jobs/jobsSlice';
import notesReducer from './notes/notesSlice';
import notificationReducer from './notifications/notificationSlice';
import usersReducer from './users/usersSlice';

const rootReducer = combineReducers({
  auth: authReducers,
  candidates: candidatesReducer,
  documents: documentReducer,
  feedbacks: feedbacksReducer,
  jobs: jobsReducer,
  notes: notesReducer,
  notifications: notificationReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export default store;
