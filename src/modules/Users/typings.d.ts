export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  msId?: string | null;
}
export interface IUserListing {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: IRole;
  profile: IProfile;
  jobs: any;
  candidates: any;
}
export interface INotification {
  id: number;
  message: string;
  read: boolean;
  candidateId: number;
  userId: number;
  candidate: ICandidate;
}
interface IRole {
  id: number;
  level: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IProfile {
  id: string;
  time_zone: string;
  locale: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
}
