import { IUser, ICandidate } from 'modules/Candidates/typings';

export interface IJob {
  clientJobId?: string;
  clientName?: string;
  createdAt?: Date;
  details: string;
  externalManager?: boolean;
  hiringManagers: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  id?: string;
  departmentId?: number;
  isJobRemote?: boolean;
  jobCreator?: IUser;
  jobSeniority?: string;
  jobTime: string;
  jobId?: string;
  jobType?: string;
  jobUrgency?: string;
  location: string;
  salaryCurrency?: string;
  salaryGross?: string;
  salaryLower: string;
  salaryPeriod?: string;
  salaryPublic?: boolean;
  salaryUpper: string;
  status: string;
  tags?: string;
  title: string;
  updatedAt?: Date;
  requiredPositions?: string;
}

export interface IJobRead {
  candidates: Array<ICandidate>;
  clientJobId?: string;
  clientName?: string;
  details: string;
  externalManager?: boolean;
  hiringManagers: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  id: string;
  closedAt?: Date;
  createdAt?: Date;
  department: any;
  departmentId?: number;
  isJobRemote?: boolean;
  jobCreator: IUser;
  jobId?: string;
  jobSeniority?: string;
  jobTime: string;
  jobType: string;
  jobUrgency: string;
  location: string;
  openAt?: Date;
  salaryCurrency: string;
  salaryGross?: string;
  salaryLower: string;
  salaryPeriod: string;
  salaryPublic?: boolean;
  salaryUpper: string;
  status: string;
  tags?: string;
  title: string;
  updatedAt?: Date;
  requiredPositions?: string;
  hiredCandidates?: string;
}

export interface IJobListing {
  id: number;
  title: string;
  createdAt: Date;
  details: string;
  jobTime: string;
  jobType?: string;
  location: string;
  salary: string;
  status: string;
  tags: string;
  updatedAt: Date;
  userId: number;
  vacants: number;
}

export type Order = 'asc' | 'desc';

interface IStage {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
