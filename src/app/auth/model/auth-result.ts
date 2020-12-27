import { User } from './user';

export class AuthResult {
  constructor(public success: boolean, public user?: User) {}
}