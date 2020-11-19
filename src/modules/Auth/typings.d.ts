export interface IAuth {
  token: string;
  expires: number;
  refreshToken: {
    token: string;
    expires: number;
    expires_in: number;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
  };
}
