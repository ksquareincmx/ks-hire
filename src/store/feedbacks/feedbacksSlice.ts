import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    loading: false,
    data: [],
    feedback: {
      score: 0,
      scoreExplenation: '',
      comment: '',
    },
    fail: {
      message: ' ',
      status: 200,
      error: false,
    },
    snackbarmsg: '',
  },
  reducers,
});

export const {
  addFeedback,
  editOneFeedback,
  getOneFeedback,
  removeFeedback,
  failFetchFeedbacks,
  getAllFeedbacks,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
  restartMessage,
} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
