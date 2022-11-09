import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('api/me')
  calculator(@Req() req: any) {
    console.log(req.user);
    return this.service.me();
  }
}
