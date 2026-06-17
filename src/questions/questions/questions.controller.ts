/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

interface AddQuestionDto {
  name: string;
  pdf: string;
  difficulty: number;
  pics: string[];
}

interface AddQues {
  name: string;
  pdfUri: string;
  difficulty: number;
  quesPic: string[];
}

interface GetDailyQuesDto {
  diffcute: number; // 根据实际业务调整类型，假设是数字
  uid: string; // 根据实际业务调整类型，假设是字符串
}

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('add')
  addQuestion(@Body() body: AddQuestionDto): any {
    console.log('============>addQuestion', body);
    const data: AddQues = {
      name: body.name,
      pdfUri: body.pdf,
      difficulty: body.difficulty,
      quesPic: body.pics,
    };
    const result: unknown = this.questionsService.add(data);
    return result;
  }

  @Post('getDailyQues')
  async getDailyQues(@Body() body: GetDailyQuesDto): Promise<any> {
    console.log(body);

    const data: GetDailyQuesDto = {
      diffcute: body.diffcute,
      uid: body.uid,
    };
    const dt: unknown = await this.questionsService.getDailyQuestion(data);
    console.log(dt);
    if (!dt) {
      return {
        code: 400,
        data: '没有数据',
      };
    } else {
      return {
        code: 200,
        data: dt,
      };
    }
  }

  @Post('queryQuestions')
  async queryQuestions(): Promise<any> {
    const dt: unknown = await this.questionsService.queryQuestions();
    console.log(dt);
    if (!dt) {
      return {
        code: 400,
        data: '没有数据',
      };
    } else {
      return {
        code: 200,
        data: dt,
      };
    }
  }
}
