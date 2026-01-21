export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IUserAPI {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface IAuthResponse {
  user: IUserAPI;
  token: string;
}