import { PayloadAction } from '@reduxjs/toolkit';
import { IFeedback } from 'modules/Candidates/typings';
import { IFetchError } from 'store/typings';

type State = {
  data: IFeedback[];
  feedback: IFeedback;
  loading: boolean;
  fail: IFetchError;
  snackbarmsg: string;
};

export const addFeedback = (
  state: State,
  action: PayloadAction<IFeedback>,
) => {
  const newFeedback: IFeedback = action.payload;
  state.data.push(newFeedback);
  state.snackbarmsg = 'Feedback created';
};

export const editOneFeedback = (
  state: State,
  action: PayloadAction<IFeedback>,
) => {
  state.feedback = action.payload;
  state.snackbarmsg = 'Feedback Edited';
};

export const getAllFeedbacks = (
  state: State,
  action: PayloadAction<IFeedback[]>,
) => {
  state.data = action.payload;
};

export const getOneFeedback = (
  state: State,
  action: PayloadAction<IFeedback>,
) => {
  state.feedback = action.payload;
};

export const removeFeedback = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.data = state.data.filter(
    (feedback) => feedback.id !== action.payload,
  );
  state.snackbarmsg = 'Feedback Deleted';
};

export const restartMessage = (state: State) => {
  state.snackbarmsg = '';
};

export const requestFetchFeedbacks = (state: State) => {
  state.loading = true;
};

export const responseFetchFeedbacks = (state: State) => {
  state.loading = false;
};

export const failFetchFeedbacks = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
  state.snackbarmsg = 'We had a problem, please try again';
};

export default {
  addFeedback,
  editOneFeedback,
  removeFeedback,
  getAllFeedbacks,
  getOneFeedback,
  failFetchFeedbacks,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
  restartMessage,
};
