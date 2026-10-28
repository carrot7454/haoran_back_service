/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerquesEntity } from 'entity/answerques.entity';
import { ClassClassifyEntity } from 'entity/classClassify.entity';
import { FuncClassEntity } from 'entity/funcClass.entity';
import { Question } from 'entity/ques.entity';
import { QuestionEntity } from 'entity/question.entity';
import { User } from 'entity/user.entity';
import { UserQues } from 'entity/userques.entity';
import { In, Not, Repository, SelectQueryBuilder } from 'typeorm';

interface DailyQuestionRequest {
  uid: number;
}

interface AddUserQuesResponse {
  data?: AnswerquesEntity;
  code?: number;
  msg?: string;
}
interface RerQuestionResponse extends QuestionEntity {
  userQuesId: string;
  status: number;
  knowladgeName?: string;
  chapter?: string;
  chapterName?: string;
  subject?: string;
  subjectName?: string;
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

interface UpdateUserQuesDto {
  id: number;
  answer?: string;
  comment?: string;
}

interface GetQuesListDto {
  name?: string;
  status?: number;
  type?: number;
  page: number;
  size: number;
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

interface GetUserQuesByStudentDto {
  uid: number;
}

interface UserDetail extends GetUserQuesByStudentDto {
  id: number;
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FuncClassEntity)
    private funcclassifyRepository: Repository<FuncClassEntity>,
  ) {}

  // async add(body: AddQues): Promise<DailyQuestionResponse> {
  //   let ret: DailyQuestionResponse;
  //   try {
  //     const question = await this.questionRepository.save({
  //       name: body.name,
  //       pdfUri: body.pdfUri,
  //       difficulty: body.difficulty * 2,
  //       isdeleted: false,
  //       knowledgeId: body.knowledgeId,
  //       quesPic: (body.quesPic ?? []).map((uri) => {
  //         return { uri };
  //       }),
  //     });
  //     console.log('question: ', question);
  //     ret = {
  //       data: question,
  //       code: 200,
  //       msg: '添加成功',
  //     };
  //   } catch (err: unknown) {
  //     ret = {
  //       msg: err instanceof Error ? err.message : 'Unknown error',
  //       code: 500,
  //     };
  //   }

  //   return ret;
  // }

  async getDailyQuestion(
    data: DailyQuestionRequest,
  ): Promise<RerQuestionResponse | null> {
    console.log(data);
    const ques = await this.userquesRepository.find();
    console.log(ques);
    const obj = ques.find((item) => item.status === 0);
    console.log('=========>obj');
    console.log(obj);
    let ret: RerQuestionResponse | null = null;
    if (!obj) {
      const user = await this.userRepository.findOne({
        where: {
          id: data.uid,
        },
      });
      const quesTypes = await this.funcclassifyRepository.findOne({
        where: {
          id: user?.groupid,
        },
      });
      const quesLs = quesTypes?.knowladge;
      if (!quesLs) {
        return null;
      }
      const question = await this.questionEntityRepository.find({
        where: {
          // difficulty: data.isDaily
          //   ? Between(data.diffcute - 1, data.diffcute + 1)
          //   : data.diffcute,
          id: Not(In(quesLs.split(','))),
        },
      });
      console.log('question=========>');
      console.log(question);
      let ret1: QuestionEntity | null = null;
      if (question.length) {
        const i = Math.floor(Math.random() * question.length);
        console.log(i);
        ret1 = question[i];
      }
      if (ret1) {
        try {
          const _ret: UserQues | null = await this.userquesRepository.save({
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
      const _ret = await this.userquesRepository.findOne({
        where: { status: 0 },
      });
      console.log('===========>P');

      console.log(_ret);
      const question = await this.questionEntityRepository.findOne({
        where: {
          id: _ret?.quesId,
        },
      });
      if (question) {
        ret = {
          ...question,
          userQuesId: (obj.id ?? 0).toString(),
          status: _ret?.status ?? 0,
        };
      }
    }
    console.log('=========>ret');
    console.log(ret);

    if (ret?.knowladge.length === 6) {
      let data = await this.classClassifyRepository.findOne({
        where: {
          code: ret.knowladge,
        },
      });
      ret.knowladgeName = data?.name;
      ret.chapter = data?.parentCode;
      data = await this.classClassifyRepository.findOne({
        where: {
          code: data?.parentCode,
        },
      });
      ret.chapterName = data?.name;
      ret.subject = data?.parentCode;
      data = await this.classClassifyRepository.findOne({
        where: {
          code: data?.parentCode,
        },
      });
      ret.subjectName = data?.name;
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
  async updateUserQues(body: UpdateUserQuesDto) {
    console.log(body);

    try {
      await this.userquesRepository
        .createQueryBuilder()
        .update(UserQues)
        .set({ status: 1, answer: body.answer })
        .where('id = :id', { id: body.id })
        .execute();
      return {
        code: 200,
        msg: '更新成功',
      };
    } catch (err) {
      return {
        msg: err instanceof Error ? err.message : 'Unknown error',
        code: 500,
      };
    }
  }
  async getUserQuesList(body: GetQuesListDto) {
    const page = Number(body.page) > 0 ? Number(body.page) : 1;
    const size = Number(body.size) > 0 ? Number(body.size) : 10;
    const skip = (page - 1) * size;

    try {
      const baseQuery = this.userquesRepository
        .createQueryBuilder('user_ques')
        .leftJoin(QuestionEntity, 'ques', 'ques.id = user_ques.quesId')
        .leftJoin(User, 'user', 'user.id = user_ques.uid')
        .select([
          'user_ques.id as id',
          'user_ques.uid as uid',
          'user_ques.quesId as quesId',
          'user_ques.status as status',
          'user_ques.answer as answer',
          'user_ques.c_time as c_time',
          'user_ques.u_time as u_time',
          'ques.name as quesName',
          'ques.desc as quesDesc',
          'ques.type as quesType',
          'user.nickname as nickname',
        ]);

      // status 属于 user_ques 表，type 属于 ques 表，nickname 属于 user 表，
      // 因此这里不能用 where({...}) 对象形式（它只会挂到主表别名上），
      // 必须显式带别名写条件。
      const applyFilter = (qb: SelectQueryBuilder<UserQues>) => {
        if (body.status === 1 || body.status === 2) {
          qb.andWhere('user_ques.status = :status', { status: body.status });
        } else {
          qb.andWhere('user_ques.status BETWEEN 1 AND 2');
        }
        if (body.type !== undefined && body.type !== null) {
          qb.andWhere('ques.type = :type', { type: body.type });
        }
        if (body.name) {
          qb.andWhere('user.nickname LIKE :name', { name: `%${body.name}%` });
        }
        return qb;
      };

      // 必须用 offset/limit，不能用 skip/take：
      // skip/take + join 会让 TypeORM 生成 `SELECT DISTINCT ... FROM (...) distinctAlias`
      // 的二层分页 SQL，而自定义的 as 别名会让外层引用不到主键列，导致查不到数据。
      const [list, total] = await Promise.all([
        applyFilter(baseQuery.clone())
          .orderBy('user_ques.status', 'ASC')
          .addOrderBy('user_ques.u_time', 'DESC')
          .offset(skip)
          .limit(size)
          .getRawMany(),
        applyFilter(baseQuery.clone()).getCount(),
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
  async getQuesDetail(body: GetQuesDetailDto) {
    try {
      const ret = await this.userquesRepository.findOne({
        where: {
          id: body.id,
        },
      });
      const _ret = await this.questionEntityRepository.findOne({
        where: {
          id: ret?.quesId,
        },
      });
      const ans = {
        ..._ret,
        ...ret,
      };

      return {
        code: 200,
        msg: '查询成功',
        data: ans,
      };
    } catch (err) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
  async newFinishUserQues(body: NewFinishUserQuesDto) {
    try {
      const ret = await this.userquesRepository
        .createQueryBuilder()
        .update(UserQues)
        .set({
          score: body.score,
          err_times: body.is_err,
          comment: body.comment,
          status: 2,
        })
        .where('id = :id', { id: body.id })
        .execute();
      if (!body.is_err) {
        const dt = await this.userquesRepository.findOne({
          where: { id: body.id },
        });
        if (dt) {
          // 答对后把同一道题其他「错误」记录置为 -1（失效）。
          // 原先用 map(async ...) 遍历更新，返回的 Promise 没有被 await，
          // 接口已返回、写库却还在飞（出错也捕获不到），改成一条批量 UPDATE。
          await this.userquesRepository
            .createQueryBuilder()
            .update(UserQues)
            .set({ err_times: -1 })
            .where('quesId = :quesId', { quesId: dt.quesId })
            .andWhere('err_times = 1')
            .execute();
        }
      }

      return {
        code: 200,
        msg: '查询成功',
        data: ret,
      };
    } catch (err) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async getUserQuesByStudent(body: GetUserQuesByStudentDto) {
    try {
      const ret = this.userquesRepository
        .createQueryBuilder('user_ques')
        .leftJoin(QuestionEntity, 'ques', 'ques.id = user_ques.quesId')
        .where('user_ques.uid = :uid', { uid: body.uid })
        // status=1（待批改）和 status=2（已批改）是「或」关系，
        // 原来写成 And({status:1},{status:2}) 会生成 status=1 AND status=2，恒为空，
        // 而且 And 是 find 选项的操作符，不能直接传给 andWhere。
        .andWhere('user_ques.status IN (:...statuses)', { statuses: [1, 2] })
        .select([
          'user_ques.id as id',
          'user_ques.uid as uid',
          'user_ques.quesId as quesId',
          'user_ques.status as status',
          'user_ques.answer as answer',
          'user_ques.c_time as c_time',
          'user_ques.u_time as u_time',
          'ques.name as quesName',
          'ques.desc as quesDesc',
          'ques.type as quesType',
        ]);

      const [list, total] = await Promise.all([
        ret
          .clone()
          .orderBy('user_ques.status', 'ASC')
          .addOrderBy('user_ques.u_time', 'DESC')
          .getRawMany(),
        ret.clone().getCount(),
      ]);
      return {
        code: 200,
        msg: '查询成功',
        data: list,
        total,
      };
    } catch (err) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
  async getUserQuesByStudentDetail(body: UserDetail) {
    try {
      const ret = await this.userquesRepository.findOne({
        where: {
          id: body.id,
          uid: body.uid,
        },
      });
      const _ret = await this.questionEntityRepository.findOne({
        where: {
          id: ret?.quesId,
        },
      });
      const ans = {
        ..._ret,
        ...ret,
      };
      return {
        code: 200,
        msg: '查询成功',
        data: ans,
      };
    } catch (err) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}
