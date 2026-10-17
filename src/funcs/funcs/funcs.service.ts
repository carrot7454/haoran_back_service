import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncClassEntity } from 'entity/funcClass.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuncsService {
  constructor(
    @InjectRepository(FuncClassEntity)
    private funcClassRepository: Repository<FuncClassEntity>,
  ) {}
  async getClassSeries() {
    try {
      const classSeries = await this.funcClassRepository.find();
      return {
        code: 200,
        data: classSeries,
        msg: '获取成功',
      };
    } catch (err: unknown) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async addClassSeries(name: string) {
    try {
      const classSeries = await this.funcClassRepository.save({
        name: name,
      });
      return { code: 200, msg: '添加成功', data: classSeries };
    } catch (err: unknown) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }

  async pairClassKnowledge(classid: string, knowledgeid: string) {
    try {
      const classSeries = await this.funcClassRepository
        .createQueryBuilder()
        .update(FuncClassEntity)
        .set({ knowladge: knowledgeid })
        .where({ id: classid })
        .execute();
      return { code: 200, msg: '添加成功', data: classSeries };
    } catch (err: unknown) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}
