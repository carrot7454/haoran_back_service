/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerquesEntity } from 'entity/answerques.entity';
import { ClassClassifyEntity } from 'entity/classClassify.entity';
import { Question } from 'entity/ques.entity';
import { QuestionEntity } from 'entity/question.entity';
import { UserQues } from 'entity/userques.entity';
import { Between, In, Not, Repository } from 'typeorm';

interface AddQues {
  name: string;
  pdfUri: string;
  difficulty: number;
  knowledgeId: number;
  quesPic?: string[];
}

interface DailyQuestionRequest {
  uid: string;
  diffcute: number;
  isDaily: number;
  typeId: number;
}

interface DailyQuestionResponse {
  data?: Question | null;
  code: number;
  msg: string;
}

interface AddUserQuesResponse {
  data?: AnswerquesEntity;
  code?: number;
  msg?: string;
}
interface RerQuestionResponse extends Question {
  userQuesId: string;
  status: number;
}

interface finishType {
  id: number;
}

interface AddQuestionDto {
  name: string;
  desc: string;
  type: number;
  option?: string;
  difficulty: number;
  knowladge: string;
}

interface PageDto {
  page: number;
  size: number;
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(UserQues)
    private userquesRepository: Repository<UserQues>,

    @InjectRepository(AnswerquesEntity)
    private answerRepository: Repository<AnswerquesEntity>,
    @InjectRepository(QuestionEntity)
    private questionEntityRepository: Repository<QuestionEntity>,
    @InjectRepository(ClassClassifyEntity)
    private classClassifyRepository: Repository<ClassClassifyEntity>,
  ) {}

  async add(body: AddQues): Promise<DailyQuestionResponse> {
    let ret: DailyQuestionResponse;
    try {
      const question = await this.questionRepository.save({
        name: body.name,
        pdfUri: body.pdfUri,
        difficulty: body.difficulty * 2,
        isdeleted: false,
        knowledgeId: body.knowledgeId,
        quesPic: (body.quesPic ?? []).map((uri) => {
          return { uri };
        }),
      });
      console.log('question: ', question);
      ret = {
        data: question,
        code: 200,
        msg: '添加成功',
      };
    } catch (err: unknown) {
      ret = {
        msg: err instanceof Error ? err.message : 'Unknown error',
        code: 500,
      };
    }

    return ret;
  }

  async queryQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async getDailyQuestion(
    data: DailyQuestionRequest,
  ): Promise<RerQuestionResponse | null> {
    console.log(data);
    if (!data.isDaily) {
      data.isDaily = 0;
    }
    console.log('data.isDaily: ', data.isDaily);
    const ques = await this.userquesRepository.find();
    console.log(ques);
    const obj = ques.find((item) => {
      if (item.status <= 2) {
        if (item.is_daily == data.isDaily) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    console.log('=========>obj');
    console.log(obj);
    let ret: RerQuestionResponse | null = null;
    if (!obj) {
      const arr = ques.map((item) => item.id);
      const question = await this.questionRepository.find({
        where: {
          difficulty: data.isDaily
            ? Between(data.diffcute - 1, data.diffcute + 1)
            : data.diffcute,
          id: Not(In(arr)),
          knowledgeId: data.typeId,
        },
      });
      console.log('question=========>');
      console.log(question);
      let ret1: Question | null = null;
      if (question.length) {
        const i = Math.floor(Math.random() * question.length);
        console.log(i);
        ret1 = question[i];
      }
      if (ret1) {
        try {
          const _ret: UserQues | null = await this.userquesRepository.save({
            is_daily: data.isDaily,
            quesId: ret1.id,
            uid: data.uid,
            status: 0,
            err_times: 0,
          });
          console.log('=============>_ret');
          console.log(_ret);
          ret = {
            userQuesId: (_ret.id ?? 0).toString(),
            status: _ret.status,
            ...ret1,
          };
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      const question = await this.questionRepository.findOne({
        where: { id: obj.quesId },
      });
      if (!question) {
        return null;
      }
      ret = {
        userQuesId: (obj.id ?? 0).toString(),
        status: obj.status,
        ...question,
      };
    }

    return ret;
  }

  async addUserQues(data: AnswerquesEntity): Promise<AddUserQuesResponse> {
    console.log(data);
    let ret = {};
    try {
      const hasUser = await this.answerRepository.findOne({
        where: {
          userId: data.userId,
          questionId: data.questionId,
        },
      });
      console.log('=============>hasUser');
      console.log(hasUser);
      if (hasUser) {
        ret = {
          msg: '数据已存在',
          code: 400,
        };
        return ret;
      }
      const req = await this.answerRepository.save(data);
      await this.userquesRepository
        .createQueryBuilder()
        .update(UserQues)
        .set({ status: 1 })
        .where('id = :id', { id: data.id })
        .execute();
      ret = {
        data: req,
        code: 200,
        msg: '添加成功',
      };
    } catch (err) {
      console.log(err);
      ret = {
        msg: err instanceof Error ? err.message : 'Unknown error',
        code: 500,
      };
    }
    return ret;
  }
  async finishUserQues(data: finishType): Promise<AddUserQuesResponse> {
    const ret = await this.userquesRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!ret) {
      return {
        msg: '数据不存在',
        code: 400,
      };
    }
    ret.status = 3;
    await this.userquesRepository.save(ret);
    return {
      code: 200,
      msg: '完成成功',
    };
  }
  async newAddQues(body: AddQuestionDto): Promise<any> {
    try {
      const ret = await this.questionEntityRepository.save(body);
      return {
        code: 200,
        msg: '添加成功',
        data: ret,
      };
    } catch (err) {
      return {
        msg: err instanceof Error ? err.message : 'Unknown error',
        code: 500,
      };
    }
  }
  async getNewQuesList(body: PageDto) {
    const page = Number(body.page) > 0 ? Number(body.page) : 1;
    const size = Number(body.size) > 0 ? Number(body.size) : 10;
    const skip = (page - 1) * size;

    try {
      const baseQuery = this.questionEntityRepository
        .createQueryBuilder('new_questions')
        .leftJoin(
          ClassClassifyEntity,
          'know',
          'know.code = new_questions.knowladge',
        )
        .select([
          'new_questions.id as id',
          'new_questions.name as name',
          'new_questions.type as type',
          'new_questions.difficulty as difficulty',
          'new_questions.knowladge as code',
          'know.name as code_name',
          'new_questions.createTime as createTime',
          'new_questions.updateTime as updateTime',
        ])
        .addSelect('new_questions.desc', 'desc')
        .addSelect('new_questions.option', 'option');

      // 必须用 offset/limit，不能用 skip/take：
      // skip/take + join 会让 TypeORM 生成 `SELECT DISTINCT ... FROM (...) distinctAlias`
      // 的二层分页 SQL，而自定义的 as 别名会让外层引用不到主键列，导致查不到数据。
      const [list, total] = await Promise.all([
        baseQuery
          .clone()
          .orderBy('new_questions.id', 'DESC')
          .offset(skip)
          .limit(size)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);
      // console.log(list, total);

      return {
        code: 200,
        msg: '查询成功',
        data: {
          pageinfo: {
            page,
            size,
            total,
          },
          list,
        },
      };
    } catch (err) {
      return {
        msg: err instanceof Error ? err.message : 'Unknown error',
        code: 500,
      };
    }
  }
}
