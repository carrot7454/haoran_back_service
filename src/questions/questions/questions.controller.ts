/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AnswerquesEntity } from 'entity/answerques.entity';

interface AddQuestionDto {
  name: string;
  pdf: string;
  difficulty: number;
  knowledgeId: number;
  pics: string[];
}

interface AddQues {
  name: string;
  pdfUri: string;
  difficulty: number;
  knowledgeId: number;
  quesPic: string[];
}

interface AddQues1 {
  id: number;
  userId: number;
  questionId: number;
  quesPic: string[];
}

interface AddQues2 {
  id: number;
}

interface GetDailyQuesDto {
  diffcute: number; // 根据实际业务调整类型，假设是数字
  uid: string; // 根据实际业务调整类型，假设是字符串
  isDaily: number;
  typeId: number;
}

interface AnswerquesEntity1 extends AnswerquesEntity {
  id: number;
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
      knowledgeId: body.knowledgeId,
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
      isDaily: body.isDaily,
      typeId: body.typeId,
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

  @Post('addUserQues')
  async addUserQues(@Body() body: AddQues1): Promise<any> {
    const data: AnswerquesEntity1 = {
      id: body.id,
      userId: body.userId,
      questionId: body.questionId,
      pics: body.quesPic.map((pic) => ({
        uri: pic,
        status: 0,
        replypics: [],
      })),
    };
    const dt: unknown = await this.questionsService.addUserQues(data);
    return dt;
  }
  @Post('finishUserQues')
  async finishUserQues(@Body() body: AddQues2): Promise<any> {
    const data: AddQues2 = {
      id: body.id,
    };
    const dt: unknown = await this.questionsService.finishUserQues(data);
    return dt;
  }
}
