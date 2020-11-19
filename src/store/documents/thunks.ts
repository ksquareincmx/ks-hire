import { AppThunk } from 'store';
import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';
import {
  addDocument,
  failFetchDocuments,
  getAllDocuments,
  removeDocument,
  requestFetchDocuments,
  responseFetchDocuments,
} from 'store/documents/documentSlice';
import documentService from 'services/document.service';

export const addNewDocument = (
  document: IDocument,
  // callback: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchDocuments());
    const res: IDocument = await documentService.addNew(document);
    dispatch(addDocument(res));
    // callback();
  } catch (err) {
    dispatch(
      failFetchDocuments({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchDocuments());
  }
};

export const deleteDocument = (id: number): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchDocuments());
    await documentService.deleteOne(id);
    dispatch(removeDocument(id));
  } catch (err) {
    dispatch(
      failFetchDocuments({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchDocuments());
  }
};

export const getDocuments = (): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchDocuments());
    const res = await documentService.getAll();
    dispatch(getAllDocuments(res));
  } catch (err) {
    dispatch(
      failFetchDocuments({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchDocuments());
  }
};
