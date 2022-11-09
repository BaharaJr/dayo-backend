import { FileInterface } from '@app/common';
import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  getApp(@Res() res: any) {
    return res.sendFile('index.html', {
      root: global.FRONTEND,
    });
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
