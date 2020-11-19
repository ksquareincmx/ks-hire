import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const today = new Date().toString();
const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    loading: false,
    data: [],
    count: 0,
    stats: {
      all: 0,
      prospective: 0,
      active: 0,
      hired: 0,
      rejected: 0,
    },
    candidate: {
      id: '',
      firstName: '',
      lastName: '',
      recruiter: {
        id: '',
        firstName: '',
        lastName: '',
      },
      employer: '',
      email: '',
      phone: '',
      referral: '',
      processInterviews: [
        {
          id: '',
          label: '',
          users: [
            {
              id: '',
              firstName: '',
              lastName: '',
            },
          ],
        },
      ],
      website: '',
      createdAt: today,
      jobs: [],
      stage: {
        id: 0,
        name: '',
        details: '',
      },
      feedbacks: [],
      notes: [],
      resume: '',
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
    applicantError: '',
  },
  reducers,
});

export const {
  addCandidate,
  failFetchCandidates,
  getAllCandidatesCount,
  editCandidate,
  getAllCandidates,
  getCandidatesStats,
  getCandidate,
  removeCandidate,
  removeCandidateFeedback,
  removeCandidateNote,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
  errorApplicant,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
