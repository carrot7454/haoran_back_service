/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Body, Controller, Post } from '@nestjs/common';
import { KnowladgeService } from './knowladge.service';

interface KnowladgeDto {
  name: string;
  class: number;
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
  async getKnowladgeList() {
    const data: unknown = await this.knowladgeService.getKnowladgeList();
    return {
      code: 200,
      data: data,
      message: '获取成功',
    };
  }
}
