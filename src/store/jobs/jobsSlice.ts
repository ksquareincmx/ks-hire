import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    loading: true,
    all: [],
    count: 0,
    stats: { all: 0, open: 0, closed: 0 },
    one: {
      id: '0',
      jobId: '',
      candidates: [],
      clientJobId: '',
      clientName: '',
      department: '',
      details: '',
      externalManager: false,
      hiringManagers: [],
      jobCreator: {
        id: '',
        firstName: '',
        lastName: '',
      },
      isJobRemote: false,
      jobsSeniority: '',
      jobTime: '',
      jobType: '',
      jobUrgency: '',
      jodDepartment: '',
      location: '',
      salaryCurrency: '',
      salaryLower: '',
      salaryPeriod: '',
      salaryPublic: false,
      salaryUpper: '',
      status: '',
      tags: '',
      title: '',
      userId: '',
    },
    successfulCreate: {
      id: '0',
      candidates: [],
      department: '',
      details: '',
      hiringManagers: [],
      jobCreator: {
        id: '',
        firstName: '',
        lastName: '',
      },
      jobTime: '',
      jobType: '',
      location: '',
      salaryLower: '',
      salaryUpper: '',
      status: '',
      tags: '',
      title: '',
    },
    successfulEdit: {
      message: '',
      success: false,
    },
    fail: {
      message: ' ',
      status: 0,
      error: false,
    },
  },
  reducers,
});

export const {
  addJob,
  beginEdit,
  endEdit,
  errorEdit,
  failFetchJobs,
  getAllJobs,
  getOneJob,
  removeJob,
  requestFetchJobs,
  responseFetchJobs,
  setJobStatus,
  successfulCreate,
  successfulEdit,
  getJobStats,
  getAllJobsCount,
} = jobsSlice.actions;

export default jobsSlice.reducer;