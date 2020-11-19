import { RootState } from 'store';

export const selectorNotesData = (state: RootState) =>
  state.notes.data;
export const selectorNoteSingle = (state: RootState) =>
  state.notes.note;
export const selectorNotesLoading = (state: RootState) =>
  state.notes.loading;
export const selectorNotesFail = (state: RootState) =>
  state.notes.fail;
export const selectorCreateSuccess = (state: RootState) =>
  state.notes.successfulCreate;
export const selectorSnackbarMsg = (state: RootState) =>
  state.notes.snackbarmsg;
