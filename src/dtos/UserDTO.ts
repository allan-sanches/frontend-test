import type { IUserAPI } from '../interfaces/IAuth';

export class UserDTO {
    id: number;
  name: string;
  email: string;
  firstName: string; 
  initials: string; 

  constructor(data: IUserAPI) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;

    
   this.firstName = data.name.split(' ')[0] || '';

    this.initials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}