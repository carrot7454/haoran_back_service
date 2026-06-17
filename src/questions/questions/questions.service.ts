/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'entity/ques.entity';
import { UserQues } from 'entity/userques.entity';
import { Between, In, Not, Repository } from 'typeorm';

interface AddQues {
  name: string;
  pdfUri: string;
  difficulty: number;
  quesPic?: string[];
}

interface DailyQuestionRequest {
  uid: string;
  diffcute: number;
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(UserQues)
    private userquesRepository: Repository<UserQues>,
  ) {}

  add(body: AddQues): Question {
    const question = this.questionRepository.create({
      name: body.name,
      pdfUri: body.pdfUri,
      difficulty: body.difficulty,
      isdeleted: false,
      quesPic: (body.quesPic ?? []).map((uri) => ({ uri })),
    });

    return question;
  }

  async queryQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getDailyQuestion(data: DailyQuestionRequest): Promise<Question | null> {
    console.log(data);
    const ques = await this.userquesRepository.find();
    console.log(ques);
    const obj = ques.find((item) => item.is_daily == 1);
    console.log(obj);
    let ret: Question | null;
    if (!obj) {
      const arr = ques.map((item) => item.id);
      const question = await this.questionRepository.find({
        where: {
          difficulty: Between(data.diffcute - 1, data.diffcute + 1),
          id: Not(In(arr)),
        },
      });
      console.log(question);
      ret = null;
      if (question.length) {
        const i = Math.floor(Math.random() * question.length);
        console.log(i);
        ret = question[i];
      }
      if (ret) {
        try {
          const _ret: unknown = await this.userquesRepository.save({
            is_daily: 1,
            quesId: ret.id,
            uid: data.uid,
            status: 0,
            err_times: 0,
          });
          console.log(_ret);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      ret = await this.questionRepository.findOne({
        where: { id: obj.quesId },
      });
    }

    return ret;
  }
}
