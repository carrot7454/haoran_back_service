/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { KnowladgeService } from './knowladge.service';
import { FileInterceptor } from '@nestjs/platform-express';

interface KnowladgeDto {
  name: string;
  classid?: string;
  serialid?: string;
}

interface PageDto {
  page: number;
  size: number;
}

@Controller('knowladge')
export class KnowladgeController {
  constructor(private readonly knowladgeService: KnowladgeService) {}

  @Post('add')
  addKnowladge(@Body() knowladge: KnowladgeDto) {
    console.log(knowladge);
    const data: unknown = this.knowladgeService.add(knowladge);
    return data;
  }

  @Post('classlist')
  async getClassList() {
    const data: unknown = await this.knowladgeService.getClassList();
    return {
      code: 200,
      data: data,
      message: '获取成功',
    };
  }

  @Post('knowledgelist')
  async getKnowladgeList(@Body() body: PageDto) {
    const data: unknown = await this.knowladgeService.getKnowladgeList(body);
    return {
      code: 200,
      data: data,
      message: '获取成功',
    };
  }

  @Post('simpleKnowledge')
  async simpleKnowledge() {
    const data: unknown = await this.knowladgeService.simpleKnowledge();
    return {
      code: 200,
      data: data,
      message: '获取成功',
    };
  }

  @Post('muti-upload')
  @UseInterceptors(FileInterceptor('file'))
  mutiUpload(@UploadedFile() file: { buffer: Buffer }) {
    console.log(file);
    console.log('muti-upload');
    if (!file) {
      return {
        code: 400,
        message: '未上传文件',
      };
    }
    const data: unknown = this.knowladgeService.mutiUpload(file.buffer);
    return data;
  }

  @Post('get-muti')
  getMuti(): unknown {
    return this.knowladgeService.getMutiClass();
  }
}
