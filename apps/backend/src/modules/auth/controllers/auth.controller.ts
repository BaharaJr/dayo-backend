import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('api/me')
  calculator() {
    return this.service.me();
  }
}
