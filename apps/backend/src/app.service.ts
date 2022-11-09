import { Injectable, Logger } from '@nestjs/common';
import jszip from 'jszip';
import { readFileSync, mkdirSync, writeFileSync, rmSync, renameSync } from 'fs';
import { FileInterface } from '@app/common';

@Injectable()
export class AppService {
  create = async (file: FileInterface) => {
    try {
      const zip = readFileSync(file.path);
      const contents = await new jszip().loadAsync(zip);
      if (Object.keys(contents.files).includes('index.html')) {
        this.updateFiles(file.path);
        return await this.unzip(contents.files);
      }
      return { status: false, error: 'Missing entry point' };
    } catch (e) {
      throw new Error(e.message);
    }
  };

  private unzip = async (files: any) => {
    mkdirSync(`${global.TEMPFILES}/app`);
    const keys = Object.keys(files);
    for (const key of keys) {
      const file = files[key];
      await this.createFiles(file);
    }
    return { status: true, message: 'App updated' };
  };

  private createFiles = async (file: any) => {
    const location = `${global.TEMPFILES}/app`;
    try {
      if (file.dir) {
        mkdirSync(`${location}/${file.name}`);
      } else {
        writeFileSync(
          `${location}/${file.name}`,
          Buffer.from(await file.async('arraybuffer')),
        );
      }
    } catch (e) {}
  };

  private updateFiles = (path: string) => {
    this.deleteZip(path, true);
    this.deleteZip(global.FRONTEND, false);
    this.updateAppFiles();
  };

  private deleteZip = (path: string, zip: boolean) => {
    try {
      rmSync(path, { recursive: true });
    } catch (e) {
      Logger.warn(`Failed to delete ${zip ? 'zip' : 'app'} ${e.message}`);
    }
  };

  private updateAppFiles = () => {
    try {
      renameSync(`${global.TEMPFILES}/app`, global.FRONTEND);
    } catch (e) {
      Logger.warn(`Failed to rename app ${e.message}`);
    }
  };
}
