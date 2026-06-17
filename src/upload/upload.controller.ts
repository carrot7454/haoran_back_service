/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';

interface FileType {
  name: string;
  base64: string;
}

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  async uploadFile(@Body() file: FileType): Promise<unknown> {
    const ret: unknown = await this.uploadService.uploadFile(file);
    console.log(ret);
    return ret;
  }
}
