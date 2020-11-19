import { RootState } from 'store';

export const selectorDocumentData = (state: RootState) =>
  state.documents.data;
export const selectorDocumentLoading = (state: RootState) =>
  state.documents.loading;
export const selectorDocumentFail = (state: RootState) =>
  state.documents.fail;
