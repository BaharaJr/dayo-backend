import { Module } from '@nestjs/common';
import { FirebaseService } from './auth.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class AuthMiddlewareModule {}
