import { IDocument } from 'modules/Candidates/views/DocumentsView/typings';

export interface ICandidate {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  documents?: IDocument[];
  email: string;
  employer?: string;
  feedbacks?: IFeedbackRead[];
  jobs?: IJob[];
  notes?: INoteRead[];
  phone: string;
  recruiter: {
    id: string;
    firstName: string;
    lastName: string;
  };
  processInterviews?: IInterviews[];
  stage?: IStage;
  source?: string;
  salaryOffer?: string;
  website?: string;
  linkedinProfile?: string;
  referral?: string;
  salaryOffer?: string;
  country?: string;
  state?: string;
  city?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  country?: string;
  state?: string;
  city?: string;
}

export interface ICandidateListing {
  id: number;
  firstName: string;
  lastName: string;
  website: string;
  recruiter: IUser;
  interviewers: IUser[];
  interviewer: IUser;
  createdAt: Date;
  jobs: IJob[];
  stage: IStage;
}
export interface IFeedback {
  id?: string;
  userName?: string;
  score: number;
  comment: string;
  candidateId?: string;
  createdAt?: Date;
  user?: IUser;
}
export interface INote {
  id?: string;
  candidateId?: string;
  noteComment: string;
  note?: string;
  userName?: string;
  mentions?: string[];
}

interface ICandidateUser {
  candidateId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IFeedbackRead {
  id: string;
  comment: string;
  score: number;
  createdAt: Date;
  user: IUser;
}

interface IJob {
  id: number;
  title: string;
  location: string;
  details: string;
  status: string;
  tags: string;
}

interface INoteRead {
  id: string;
  createdAt: Date;
  note: string;
  user: IUser;
}

interface IStage {
  id: number;
  name: string;
  details: string;
  createdAt?: Date;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  CandidateUser?: ICandidateUser;
}

interface IInterviews {
  id: string;
  label: string;
  users: IUser[];
}
