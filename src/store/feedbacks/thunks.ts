import { AppThunk } from 'store';
import {
  addFeedback,
  editOneFeedback,
  removeFeedback,
  getOneFeedback,
  failFetchFeedbacks,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
} from 'store/feedbacks/feedbacksSlice';
import { IFeedback } from 'modules/Candidates/typings';
import feedbackService from 'services/feedbacks.service';
import { removeCandidateFeedback } from 'store/candidates/candidatesSlice';

export const addNewFeedback = (
  feedback: IFeedback,
  callback: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchFeedbacks());
    const res = await feedbackService.addNew(feedback);
    dispatch(addFeedback(res));
    callback();
  } catch (err) {
    dispatch(
      failFetchFeedbacks({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchFeedbacks());
  }
};

export const deleteFeedback = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchFeedbacks());
    await feedbackService.deleteOne(id);
    dispatch(removeCandidateFeedback(id));
    dispatch(removeFeedback(id));
  } catch (err) {
    dispatch(
      failFetchFeedbacks({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchFeedbacks());
  }
};

export const getFeedback = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchFeedbacks());
    const res = await feedbackService.getById(id);
    dispatch(getOneFeedback(res));
  } catch (err) {
    dispatch(
      failFetchFeedbacks({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchFeedbacks());
  }
};

export const editFeedback = (
  id: string,
  feedback: IFeedback,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchFeedbacks());
    const res = await feedbackService.editOne(id, feedback);
    dispatch(editOneFeedback(res));
  } catch (err) {
    dispatch(
      failFetchFeedbacks({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchFeedbacks());
  }
};
