import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    loading: false,
    data: [],
    fail: {
      message: '',
      status: 200,
      error: false,
    },
  },
  reducers,
});

export const {
  addDocument,
  addDocuments,
  removeDocument,
  failFetchDocuments,
  getAllDocuments,
  requestFetchDocuments,
  responseFetchDocuments,
} = documentSlice.actions;

export default documentSlice.reducer;
