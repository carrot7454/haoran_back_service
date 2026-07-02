/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface AnswerlistRet {
  code: number;
  data: any;
  msg: string;
}

interface AnswerquesEntity2 {
  id: number;
  questionId: number;
  quesPic: QuesPic[];
}

interface AnswerquesEntity3 {
  id: number;
  score: number;
}

interface QuesPic {
  uri: string;
  quesdesc: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('answerlist')
  async answerlist(): Promise<AnswerlistRet> {
    return await this.authService.answerlist();
  }

  @Post('auswerdetial')
  async auswerdetial(@Body() body: { id: number }): Promise<AnswerlistRet> {
    return await this.authService.auswerdetial(body.id);
  }

  @Post('updateChangeQuestion')
  async updateChangeQuestion(@Body() body: AnswerquesEntity2): Promise<any> {
    const data: AnswerquesEntity2 = {
      id: body.id,
      questionId: body.questionId,
      quesPic: body.quesPic,
    };
    const dt: unknown = await this.authService.updateChangeQuestion(data);
    return dt;
  }

  @Post('updateChangeQues')
  async updateChangeQues(@Body() body: AnswerquesEntity3): Promise<any> {
    const data: AnswerquesEntity3 = {
      id: body.id,
      score: body.score,
    };
    const dt: unknown = await this.authService.updateChangeQues(data);
    return dt;
  }
}
