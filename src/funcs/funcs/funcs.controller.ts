import { Body, Controller, Post } from '@nestjs/common';
import { FuncsService } from './funcs.service';

@Controller('funcs')
export class FuncsController {
  constructor(private readonly funcsService: FuncsService) {}

  @Post('getClassSeries')
  getClassSeries() {
    return this.funcsService.getClassSeries();
  }

  @Post('addClassSeries')
  addClassSeries(@Body('name') name: string) {
    return this.funcsService.addClassSeries(name);
  }

  @Post('pairClassKnowledge')
  pairClassKnowledge(
    @Body('classid') classid: string,
    @Body('knowledgeid') knowledgeid: string,
  ) {
    return this.funcsService.pairClassKnowledge(classid, knowledgeid);
  }
}
