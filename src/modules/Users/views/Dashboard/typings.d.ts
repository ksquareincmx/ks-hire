export interface IStat {
  stat: string;
  text: string;
  amount: number;
}

export interface INotification {
  id: number;
  message: string;
  read: boolean;
  candidateId: number;
  userId: number;
  jobId: number;
  type: string;
  candidate: ICandidate;
  createdAt: Date;
  user: any;
}

export const notification: INotification = {
  id: 0,
  message: '',
  read: false,
  candidateId: 0,
  userId: 0,
  candidate: candidate,
  createdAt: new Date().toLocaleDateString(),
};
