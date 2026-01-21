import api from '../services/api';
import type { ILoginCredentials, IUserAPI } from '../interfaces/IAuth';

class AuthRepository {
  async login(credentials: ILoginCredentials): Promise<IUserAPI | undefined> {
    const { data } = await api.get<IUserAPI[]>(
      `/users?email=${credentials.email}&password=${credentials.password}`
    );
    
    return data[0];
  }
}

export default new AuthRepository();