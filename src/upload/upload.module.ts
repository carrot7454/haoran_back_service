/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UploadController],
  imports: [HttpModule],
  providers: [UploadService],
})
export class UploadModule {}
