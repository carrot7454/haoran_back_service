/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerquesEntity } from 'entity/answerques.entity';
import { User } from 'entity/user.entity';
import { Question } from 'entity/ques.entity';
import { AnswerquespicEntity } from 'entity/answerquespic.entity';
import { UserQues } from 'entity/userques.entity';

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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AnswerquesEntity)
    private answerQuesRepository: Repository<AnswerquesEntity>,
    @InjectRepository(AnswerquespicEntity)
    private answerQuesPicRepository: Repository<AnswerquespicEntity>,
    @InjectRepository(UserQues)
    private userquesRepository: Repository<UserQues>,
    @InjectRepository(Question)
    private quesRepo: Repository<Question>,
  ) {}

  async answerlist(): Promise<AnswerlistRet> {
    let ret: AnswerlistRet | null = null;
    try {
      const _ret = await this.answerQuesRepository
        .createQueryBuilder('answerques')
        .innerJoinAndSelect(User, 'user', 'user.id = answerques.userId')
        .where({
          status: 0,
        })
        .leftJoinAndSelect(
          Question,
          'question',
          'question.id = answerques.questionId',
        )
        .select([
          'answerques.id as id',
          'answerques.questionId as ques_id',
          'answerques.userId as user_id',
          'user.name',
          'user.name as user_name',
          'question.name as ques_name',
          'answerques.status as status',
          'answerques.createTime as create_time',
        ])
        .getRawMany();
      //   _ret = await Promise.all(
      //     _ret.map(async (item) => {
      //       const user = await this.userRepo.findOne({
      //         where: { id: String(item.userId) },
      //       });
      //       return {
      //         ...item,
      //         name: user?.name,
      //       };
      //     }),
      //   );

      console.log(_ret);
      ret = {
        code: 200,
        data: _ret,
        msg: '获取成功',
      };
    } catch (e) {
      console.log(e);
      ret = {
        code: 500,
        data: null,
        msg: '获取失败',
      };
    }
    return ret;
  }

  async auswerdetial(id: number): Promise<AnswerlistRet> {
    const answer = await this.answerQuesRepository.findOne({
      where: { id: id },
    });
    if (!answer) {
      return {
        code: 404,
        data: null,
        msg: '未找到记录',
      };
    }
    const question = await this.quesRepo.findOneBy({
      id: String(answer.questionId),
    });
    const data = {
      ...answer,
      ques_name: question?.name,
    };
    return {
      code: 200,
      data,
      msg: '获取成功',
    };
  }

  async updateChangeQuestion(body: AnswerquesEntity2) {
    const answer = await this.answerQuesPicRepository.findOne({
      where: { id: body.questionId },
    });
    if (!answer) {
      return {
        code: 404,
        msg: '未找到试题记录',
      };
    }

    answer.replypics = body.quesPic;
    answer.status = 1;

    await this.answerQuesPicRepository.save(answer);

    const ques = await this.answerQuesRepository.findOne({
      where: { id: body.id },
    });
    if (!ques) {
      return {
        code: 404,
        msg: '未找到用户试题',
      };
    }
    const flag = ques.pics.every((item) => item.status == 1);

    if (flag) {
      ques.status = 2;
      await this.answerQuesRepository.save(ques);
    }

    return {
      code: 200,
      msg: '更新成功',
    };
  }

  async updateChangeQues(body: AnswerquesEntity3) {
    const userques = await this.userquesRepository.findOne({
      where: { id: body.id },
    });
    if (!userques) {
      return {
        code: 404,
        msg: '未找到用户记录',
      };
    }
    userques.score = body.score;
    userques.status = 2;
    await this.userquesRepository.save(userques);
    const ques = await this.answerQuesRepository.findOne({
      where: { id: body.id },
    });
    if (!ques) {
      return {
        code: 404,
        msg: '未找到试题记录',
      };
    }
    ques.status = 3;
    await this.answerQuesRepository.save(ques);
    return {
      code: 200,
      msg: '更新成功',
    };
  }
}
