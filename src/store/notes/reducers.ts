import { PayloadAction } from '@reduxjs/toolkit';
import { INote } from 'modules/Candidates/typings';
import { IFetchError } from 'store/typings';

type State = {
  data: INote[];
  note: INote;
  loading: boolean;
  fail: IFetchError;
  snackbarmsg: string;
};

export const addNote = (
  state: State,
  action: PayloadAction<INote>,
) => {
  const newNote: INote = action.payload;
  state.data.push(newNote);
  state.snackbarmsg = 'Note created';
};

export const editOneNote = (
  state: State,
  action: PayloadAction<INote>,
) => {
  state.note = action.payload;
  state.snackbarmsg = 'Note Edited';
};

export const getAllNotes = (
  state: State,
  action: PayloadAction<INote[]>,
) => {
  state.data = action.payload;
};

export const getOneNote = (
  state: State,
  action: PayloadAction<INote>,
) => {
  state.note = action.payload;
};

export const removeNote = (
  state: State,
  action: PayloadAction<string>,
) => {
  state.data = state.data.filter(
    (note) => note.id !== action.payload,
  );
  state.snackbarmsg = 'Note Deleted';
};

export const requestFetchNotes = (state: State) => {
  state.loading = true;
};

export const responseFetchNotes = (state: State) => {
  state.loading = false;
};

export const restartMessage = (state: State) => {
  state.snackbarmsg = '';
};

export const failFetchNotes = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
  state.snackbarmsg = 'We had a problem, please try again';
};

export default {
  addNote,
  editOneNote,
  failFetchNotes,
  getAllNotes,
  getOneNote,
  removeNote,
  requestFetchNotes,
  responseFetchNotes,
  restartMessage,
};
