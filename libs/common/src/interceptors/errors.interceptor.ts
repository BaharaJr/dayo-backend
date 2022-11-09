import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { URLS } from '../constants/app.constants';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    let message: string;
    const detail = exception.detail;
    if (typeof detail === 'string' && detail?.includes('already exists')) {
      message = exception.table.split('_').join(' ') + ' with';
      message = exception.detail.replace('Key', message);
    } else {
      message = exception?.message?.includes('Bad Request Exception')
        ? exception?.response?.message?.join(',')
        : exception?.message || exception?.error;
    }
    message = message.split('(').join('');
    message = message.split(')').join('');
    message = message.split('=').join(' ');

    message = this.sanitizeMessage(message);
    if (
      message.includes('Oops') &&
      (existsSync(`${global.FRONTEND}/${request?.url}`) ||
        URLS.includes(request.url))
    ) {
      return response.sendFile(
        URLS.includes(request.url) ? 'index.html' : request.url,
        {
          root: global.FRONTEND,
        },
      );
    }
    Logger.error(message, `${request?.method} ${request?.url}`, 'Exception');
    if (response) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: message });
    }
    return new Error(message);
  }

  sanitizeMessage = (message: string) => {
    if (
      message.includes('Cannot POST') ||
      message.includes('Cannot GET') ||
      message.includes('Cannot PATCH') ||
      message.includes('Cannot DELETE') ||
      message.includes('Cannot PUT')
    ) {
      message = 'Oops 😢! Route not available.';
    } else {
      message = message.includes(
        'Could not find any entity of type "User" matching',
      )
        ? 'User not found'
        : message;
    }
    return message;
  };
}
