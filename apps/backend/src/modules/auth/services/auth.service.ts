import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  me = () => {
    return 'yeah';
  };
}
