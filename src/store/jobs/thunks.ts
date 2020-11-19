import { AppThunk } from 'store';
import { IJob } from 'modules/Jobs/typings';
import {
  addJob,
  failFetchJobs,
  getAllJobs,
  getOneJob,
  requestFetchJobs,
  responseFetchJobs,
  beginEdit,
  endEdit,
  successfulCreate,
  successfulEdit,
  errorEdit,
  setJobStatus,
  getJobStats,
  getAllJobsCount,
} from 'store/jobs/jobsSlice';
import jobService from 'services/jobs.service';

export const getJobs = (
  filter?: string,
  order?: string,
  orderBy?: string,
  rowsPerPage: number = 5,
  page: number = 0,
  search?: string,
  location?: string,
): AppThunk => async (dispatch) => {
  dispatch(requestFetchJobs());
  try {
    const jobs = await jobService.getAll(
      filter,
      order,
      orderBy,
      rowsPerPage,
      page,
      search,
      location,
    );
    const stats = await jobService.getJobStatistics();

    dispatch(getAllJobs(jobs.rows));
    dispatch(getAllJobsCount(jobs.count));
    dispatch(getJobStats(stats));
  } catch (err) {
    dispatch(
      failFetchJobs({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  }
  dispatch(responseFetchJobs());
};

export const getJob = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFetchJobs());
    const job = await jobService.getById(id);
    dispatch(getOneJob(job));
  } catch (err) {
    dispatch(
      failFetchJobs({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchJobs());
  }
};

export const addNewJob = (
  job: IJob,
  setOpen: (open: boolean) => void,
): AppThunk => async (dispatch) => {
  dispatch(requestFetchJobs());
  try {
    const res = await jobService.addNew(job);
    dispatch(successfulCreate(res));
    dispatch(addJob(res));
    setOpen(true);
  } catch (err) {
    dispatch(
      failFetchJobs({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  }
  dispatch(responseFetchJobs());
};

export const deleteJob = (id: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(requestFetchJobs());
    await jobService.deleteOne(id);
  } catch (err) {
    dispatch(
      failFetchJobs({
        message: err.message,
        status: err.status,
        error: true,
      }),
    );
  } finally {
    dispatch(responseFetchJobs());
  }
};

export const editJob = (
  id: string,
  job: IJob,
  setOpen: (open: boolean) => void,
): AppThunk => async (dispatch) => {
  try {
    dispatch(beginEdit());
    await jobService.editOne(id, job);
    dispatch(
      successfulEdit({
        message: 'Edit Successful',
        success: true,
      }),
    );
    setOpen(true);
  } catch (e) {
    dispatch(errorEdit({ message: 'Edit failed', success: false }));
  }
  dispatch(endEdit());
};

export const editJobStatus = (
  id: string,
  job: IJob,
): AppThunk => async (dispatch) => {
  dispatch(beginEdit());

  jobService
    .editOne(id, job)
    .then((res) => {
      dispatch(endEdit());
      dispatch(setJobStatus(res.status));
    })
    .catch(() => {
      dispatch(endEdit());
    });
};
