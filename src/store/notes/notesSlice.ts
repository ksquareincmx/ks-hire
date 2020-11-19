import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    loading: false,
    data: [],
    note: {
      noteComment: '',
      note: '',
    },
    successfulCreate: {
      id: '0',
      note: { noteComment: '' },
    },
    successfulEdit: {
      message: '',
      success: false,
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
  addNote,
  editOneNote,
  getOneNote,
  removeNote,
  failFetchNotes,
  getAllNotes,
  requestFetchNotes,
  responseFetchNotes,
  restartMessage,
} = notesSlice.actions;

export default notesSlice.reducer;
