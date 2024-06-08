import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateToken(token: string): boolean {
    // Logic for validating token
    return true;
  }
}
