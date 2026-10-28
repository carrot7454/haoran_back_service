/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AnswerquesEntity } from 'entity/answerques.entity';

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
  uid: number; // 根据实际业务调整类型，假设
}

interface AnswerquesEntity1 extends AnswerquesEntity {
  id: number;
}

interface NewAddQuesDto {
  name: string;
  desc: string;
  type: number;
  option?: string;
  difficulty: number;
  knowladge: string;
}

interface GetQuesListDto {
  name?: string;
  status?: number;
  type?: number;
  page: number;
  size: number;
}

interface UpdateQuesEntity {
  id: number;
  answer?: string;
  comment?: string;
}

interface GetQuesDetailDto {
  id: number;
}

interface NewFinishUserQuesDto {
  id: number;
  comment: string;
  score: number;
  is_err: number;
}

interface User {
  uid: number;
}

interface UserDetail extends User {
  id: number;
}

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // @Post('add')
  // addQuestion(@Body() body: AddQuestionDto): any {
  //   console.log('============>addQuestion', body);
  //   const data: AddQues = {
  //     name: body.name,
  //     pdfUri: body.pdf,
  //     knowledgeId: body.knowledgeId,
  //     difficulty: body.difficulty,
  //     quesPic: body.pics,
  //   };
  //   const result: unknown = this.questionsService.add(data);
  //   return result;
  // }

  @Post('getDailyQues')
  async getDailyQues(@Body() body: GetDailyQuesDto): Promise<any> {
    console.log(body);

    const data: GetDailyQuesDto = {
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

  // @Post('queryQuestions')
  // async queryQuestions(): Promise<any> {
  //   const dt: unknown = await this.questionsService.queryQuestions();
  //   console.log(dt);
  //   if (!dt) {
  //     return {
  //       code: 400,
  //       data: '没有数据',
  //     };
  //   } else {
  //     return {
  //       code: 200,
  //       data: dt,
  //     };
  //   }
  // }

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
  @Post('newAddQues')
  async newAddQues(@Body() body: NewAddQuesDto) {
    const data: NewAddQuesDto = {
      name: body.name,
      desc: body.desc,
      type: body.type,
      option: body.option,
      difficulty: body.difficulty,
      knowladge: body.knowladge,
    };
    const dt: unknown = await this.questionsService.newAddQues(data);
    return dt;
  }
  @Post('getNewQuesList')
  async getNewQuesList(@Body() body: GetQuesListDto) {
    const dt: unknown = await this.questionsService.getNewQuesList(body);
    return dt;
  }
  @Post('updateUserQues')
  async updateUserQues(@Body() body: UpdateQuesEntity) {
    const dt: unknown = await this.questionsService.updateUserQues(body);
    return dt;
  }
  @Post('getUserQuesList')
  async getUserQuesList(@Body() body: GetQuesListDto) {
    const dt: unknown = await this.questionsService.getUserQuesList(body);
    return dt;
  }
  @Post('getQuesDetail')
  async getQuesDetail(@Body() body: GetQuesDetailDto) {
    const dt: unknown = await this.questionsService.getQuesDetail(body);
    return dt;
  }
  @Post('newFinishUserQues')
  async newFinishUserQues(@Body() body: NewFinishUserQuesDto) {
    const dt: unknown = await this.questionsService.newFinishUserQues(body);
    return dt;
  }
  @Post('getUserQuesByStudent')
  async getUserQuesByStudent(@Body() body: User) {
    const dt: unknown = await this.questionsService.getUserQuesByStudent(body);
    return dt;
  }
  @Post('getUserQuesByStudentDetail')
  async getUserQuesByStudentDetail(@Body() body: UserDetail) {
    const dt: unknown =
      await this.questionsService.getUserQuesByStudentDetail(body);
    return dt;
  }
}
