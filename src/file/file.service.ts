import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + fileExtension;
      const filePatch = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePatch)) {
        fs.mkdirSync(filePatch, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePatch, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      console.error(e);
      throw new HttpException(e.messagee, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeFile(fileName: string) {
    return null;
  }
}
