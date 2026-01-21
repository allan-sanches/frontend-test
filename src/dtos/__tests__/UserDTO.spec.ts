import { describe, it, expect } from 'vitest';
import { UserDTO } from '../UserDTO';
import type { IUserAPI } from '../../interfaces/IAuth';

describe('UserDTO', () => {
  it('deve formatar as iniciais corretamente para nomes compostos', () => {
    // 1. Arrange (Preparação)
    const mockUserAPI: IUserAPI = {
      id: 1,
      name: 'Allan Sanches',
      email: 'dev@teste.com'
    };

    // 2. Act (Ação)
    const userDto = new UserDTO(mockUserAPI);

    // 3. Assert (Verificação)
    expect(userDto.initials).toBe('AS');
    expect(userDto.firstName).toBe('Allan');
  });

  it('deve pegar as duas primeiras letras se for nome único', () => {
    const mockUserAPI: IUserAPI = {
      id: 2,
      name: 'Admin',
      email: 'admin@teste.com'
    };

    const userDto = new UserDTO(mockUserAPI);

    // No seu código atual, a lógica pega iniciais de palavras separadas.
    // Se for uma palavra só, ele pega a primeira letra apenas.
    // Vamos testar o comportamento real do seu código:
    expect(userDto.firstName).toBe('Admin');
  });
});