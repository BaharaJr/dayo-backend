import { FileInterface } from '@app/common';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getApp(@Res() res: any) {
    return res.redirect('dayo/home');
  }
  @Get('dayo')
  home(@Res() res: any) {
    return res.redirect(`dayo/home`);
  }
  @Get('dayo/:app')
  getRoute(@Res() res: any, @Param('app') app: string) {
    if (`${global.FRONTEND}/${app === 'home' ? 'index.html' : app}`) {
      return res.sendFile(app === 'home' ? 'index.html' : app, {
        root: global.FRONTEND,
      });
    }
    return res.status(HttpStatus.NOT_FOUND).send({ error: 'Route not found.' });
  }
  @Get('dayo/:app/*')
  loadApp(@Res() res: any, @Param() params: any) {
    if (existsSync(`${global.FRONTEND}/${params['0']}`)) {
      return res.sendFile(params['0'], {
        root: global.FRONTEND,
      });
    }
    return res.status(HttpStatus.NOT_FOUND).send({ error: 'Route not found.' });
  }

  @Post('api/apps')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: global.TEMPFILES,
        filename: (
          req: any,
          file: any,
          cb: (arg0: any, arg1: string) => void,
        ) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, randomName + '.app.zip');
        },
      }),
    }),
  )
  async create(
    @Res() res: any,
    @UploadedFile() file: FileInterface,
  ): Promise<{ status: boolean; message?: string; error?: string }> {
    try {
      const data = await this.service.create(file);
      console.log(data);
      return res
        .status(data.status ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
        .send(data);
    } catch (error) {
      unlinkSync(global.TEMPFILES + '/' + file.filename);
      res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
    }
  }
}
