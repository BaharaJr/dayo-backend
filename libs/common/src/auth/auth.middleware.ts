import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { FirebaseService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(private service: FirebaseService) {
    this.auth = service.getAuth();
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
            roles: decodedToken.roles || [],
            type: decodedToken.type,
          };
          next();
        })
        .catch(() => {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .send({ error: 'Unauthorized' });
        });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: 'Unauthorized' });
    }
  }
}
