import { RootState } from 'store';

export const sel_candidatesData = (state: RootState) =>
  state.candidates.data;
export const sel_candidateData = (state: RootState) =>
  state.candidates.candidate;
export const sel_candidatesLoading = (state: RootState) =>
  state.candidates.loading;
export const sel_candidatesFail = (state: RootState) =>
  state.candidates.fail;
export const sel_edit_success = (state: RootState) =>
  state.candidates.successfulEdit;
export const sel_applicant_error = (state: RootState) =>
  state.candidates.applicantError;
export const sel_candidatesCount = (state: RootState) =>
  state.candidates.count;
export const sel_candidatesStats = (state: RootState) =>
  state.candidates.stats;
