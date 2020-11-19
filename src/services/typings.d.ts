//Candidates
export interface IAddCandidate {
  firstName: string;
  lastName: string;
  email: string;
  jobId: fstring;
  linkedin: string;
  phone: string;
  referral?: string;
  source?: string;
  stageId?: string;
  salaryOffer?: string;
  website: string;
  firstContact?: string[];
  techInterview1?: string[];
  techInterview2?: string[];
  type?: string;
  recruiterId?: string;
  resume?: binary;
  country: string;
  state: string;
  city: string;
  recaptcha?: any;
}

//Location

export interface ICountry {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IState extends ICountry {
  country_id: number;
}

export interface ICity extends ICountry {
  state_id: number;
}
