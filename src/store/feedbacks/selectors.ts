import { RootState } from 'store';

export const selectorFeedbacksData = (state: RootState) =>
  state.feedbacks.data;
export const selectorFeedbackSingle = (state: RootState) =>
  state.feedbacks.feedback;
export const selectorFeedbacksLoading = (state: RootState) =>
  state.feedbacks.loading;
export const selectorFeedbacksFail = (state: RootState) =>
  state.feedbacks.fail;
export const selectorSnackbarMsg = (state: RootState) =>
  state.feedbacks.snackbarmsg;
