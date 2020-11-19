import { PayloadAction } from '@reduxjs/toolkit';
import { IFetchError } from 'store/typings';
import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';

type State = {
  data: IDocument[];
  loading: boolean;
  fail: IFetchError;
};

export const addDocument = (
  state: State,
  action: PayloadAction<IDocument>,
) => {
  const newDocument: IDocument = action.payload;
  state.data.push(newDocument);
};

export const addDocuments = (
  state: State,
  action: PayloadAction<IDocument[]>,
) => {
  state.data = action.payload;
};

export const getAllDocuments = (
  state: State,
  action: PayloadAction<IDocument[]>,
) => {
  state.data = action.payload;
};

export const removeDocument = (
  state: State,
  action: PayloadAction<number>,
) => {
  state.data = state.data.filter(
    (Document) => Document.id !== action.payload,
  );
};

export const requestFetchDocuments = (state: State) => {
  state.loading = true;
};

export const responseFetchDocuments = (state: State) => {
  state.loading = false;
};

export const failFetchDocuments = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};

export default {
  addDocument,
  addDocuments,
  removeDocument,
  failFetchDocuments,
  getAllDocuments,
  requestFetchDocuments,
  responseFetchDocuments,
};
