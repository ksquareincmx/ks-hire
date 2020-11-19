import { PayloadAction } from '@reduxjs/toolkit';
import { ICandidate } from 'modules/Candidates/typings';
import { IFetchError } from 'store/typings';

type SuccessfulEdit = {
  message: string;
  success: boolean;
};

type State = {
  data: ICandidate[];
  count: number;
  candidate: ICandidate;
  stats: {
    all: number;
    prospective: number;
    active: number;
    hired: number;
    rejected: number;
  };
  loading: boolean;
  fail: IFetchError;
  successfulEdit: SuccessfulEdit;
  applicantError: string;
};

export const addCandidate = (
  state: State,
  action: PayloadAction<ICandidate>,
) => {
  const newCandidate: ICandidate = action.payload;

  state.data.push(newCandidate);
};

export const getAllCandidates = (
  state: State,
  action: PayloadAction<ICandidate[]>,
) => {
  state.data = action.payload;
};

export const getAllCandidatesCount = (
  state: State,
  action: PayloadAction<any>,
) => {
  state.count = action.payload;
};

export const getCandidatesStats = (
  state: State,
  action: PayloadAction<any>,
) => {
  state.stats = action.payload;
};

export const removeCandidateFeedback = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.candidate.feedbacks = state.candidate.feedbacks?.filter(
    (feedback) => feedback.id !== action.payload,
  );
};
export const removeCandidateNote = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.candidate.notes = state.candidate.notes?.filter(
    (note) => note.id !== action.payload,
  );
};
export const editCandidate = (
  state: State,
  action: PayloadAction<ICandidate>,
) => {
  state.candidate = action.payload;
};

export const getCandidate = (
  state: State,
  action: PayloadAction<ICandidate>,
) => {
  state.candidate = action.payload;
};

export const failFetchCandidates = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};

export const removeCandidate = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.data = state.data.filter(
    (candidate) => candidate.id !== action.payload,
  );
};

export const requestFetchCandidates = (state: State) => {
  state.loading = true;
};

export const responseFetchCandidates = (state: State) => {
  state.loading = false;
};

export const beginEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};

export const endEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};

export const errorEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};

export const errorApplicant = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.applicantError = action.payload;
};

export const successfulEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};

export default {
  addCandidate,
  failFetchCandidates,
  getAllCandidates,
  getAllCandidatesCount,
  getCandidatesStats,
  editCandidate,
  getCandidate,
  removeCandidate,
  removeCandidateFeedback,
  removeCandidateNote,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
  errorApplicant,
};
