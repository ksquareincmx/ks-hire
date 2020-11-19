import { AppThunk } from 'store';
import {
  addNote,
  editOneNote,
  failFetchNotes,
  getOneNote,
  requestFetchNotes,
  responseFetchNotes,
  removeNote,
} from 'store/notes/notesSlice';
import { INote } from 'modules/Candidates/typings';
import { removeCandidateNote } from 'store/candidates/candidatesSlice';
import noteService from 'services/notes.service';

export const addNewNote = (
  note: INote,
  callback: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchNotes());
    const res = await noteService.addNew(note);
    dispatch(addNote(res));
    callback();
  } catch (err) {
    dispatch(
      failFetchNotes({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotes());
  }
};

export const deleteNote = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchNotes());
    await noteService.deleteOne(id);
    dispatch(removeCandidateNote(id));
    dispatch(removeNote(id));
  } catch (err) {
    dispatch(
      failFetchNotes({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotes());
  }
};

export const getNote = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchNotes());
    const res = await noteService.getById(id);
    dispatch(getOneNote(res));
  } catch (err) {
    dispatch(
      failFetchNotes({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotes());
  }
};

export const editNote = (id: string, note: INote): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchNotes());
    const res = await noteService.editOne(id, note);
    dispatch(editOneNote(res));
  } catch (err) {
    dispatch(
      failFetchNotes({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchNotes());
  }
};
