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
}
