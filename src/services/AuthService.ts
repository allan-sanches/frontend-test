import AuthRepository from '../repositories/AuthRepository';
import { UserDTO } from '../dtos/UserDTO';
import type { ILoginCredentials } from '../interfaces/IAuth';

class AuthService {
  async authenticate(credentials: ILoginCredentials): Promise<{ user: UserDTO; token: string }> {
  
    const userRaw = await AuthRepository.login(credentials);

   
    if (!userRaw) {
      throw new Error('Usuário ou senha inválidos');
    }

    
    const user = new UserDTO(userRaw);

   
    const token = `fake-jwt-${Date.now()}-${user.id}`;

    return { user, token };
  }
}

export default new AuthService();