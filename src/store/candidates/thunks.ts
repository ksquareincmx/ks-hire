import { AppThunk } from 'store';

import {
  addCandidate,
  editCandidate,
  failFetchCandidates,
  getCandidate,
  getAllCandidates,
  getAllCandidatesCount,
  removeCandidate,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
  getCandidatesStats,
} from 'store/candidates/candidatesSlice';
import candidatesService from 'services/candidates.service';
export const addNewCandidate = (
  candidate: any,
  setOpen: (option: boolean) => void,
): AppThunk => async (dispatch) => {
  dispatch(requestFetchCandidates());

  try {
    const res = await candidatesService.addNew(candidate);
    dispatch(addCandidate(res));
    dispatch(editCandidate(res));
    setOpen(true);
  } catch (err) {
    dispatch(
      failFetchCandidates({
        message: err,
        status: err.status,
        error: true,
      }),
    );
  }

  dispatch(responseFetchCandidates());
};

export const deleteCandidate = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchCandidates());
    await candidatesService.deleteOne(id);
    dispatch(removeCandidate(id));
  } catch (err) {
    dispatch(
      failFetchCandidates({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchCandidates());
  }
};

export const getCandidates = (
  filter?: string,
  order?: string,
  orderBy?: string,
  rowsPerPage: number = 5,
  page: number = 0,
  search?: string,
): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchCandidates());
    const candidates = await candidatesService.getAll(
      filter,
      order,
      orderBy,
      rowsPerPage,
      page,
      search,
    );

    const stats = await candidatesService.getCandidateStatistics();
    dispatch(getAllCandidates(candidates.rows));
    dispatch(getAllCandidatesCount(candidates.count));
    dispatch(getCandidatesStats(stats));
  } catch (err) {
    dispatch(
      failFetchCandidates({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchCandidates());
  }
};
export const getOneCandidate = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchCandidates());
    const candidate = await candidatesService.getById(id);
    dispatch(getCandidate(candidate));
  } catch (err) {
    dispatch(
      failFetchCandidates({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchCandidates());
  }
};

export const editOneCandidate = (
  id: string,
  candidate: any,
  cb: () => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(beginEdit());
    await candidatesService.editOne(id, candidate);
    dispatch(
      successfulEdit({
        message: 'Edit Successful',
        success: true,
      }),
    );
    cb();
  } catch (e) {
    dispatch(errorEdit({ message: 'Edit failed', success: false }));
  } finally {
    dispatch(endEdit());
  }
};
