import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncClassEntity } from 'entity/funcClass.entity';
import { User } from 'entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getUserList(page: number, size: number) {
    try {
      const skip = (page - 1) * size;
      const baseQuery = this.userRepository
        .createQueryBuilder('user')
        .leftJoin(FuncClassEntity, 'func_class', 'user.groupid = func_class.id')
        .select([
          'user.id as id',
          'user.name as name',
          'user.nickname as nickname',
          'func_class.name as class_name',
          'user.ctime as ctime',
          'user.utime as utime',
        ]);

      // 必须用 offset/limit，不能用 skip/take：
      // skip/take + join 会让 TypeORM 生成 `SELECT DISTINCT ... FROM (...) distinctAlias`
      // 的二层分页 SQL，而自定义的 as 别名会让外层引用不到主键列，导致查不到数据。
      const [list, total] = await Promise.all([
        baseQuery
          .clone()
          .orderBy('user.id', 'DESC')
          .offset(skip)
          .limit(size)
          .getRawMany(),
        baseQuery.clone().getCount(),
      ]);
      return {
        code: 200,
        data: list,
        total,
        msg: '获取成功',
      };
    } catch (err: unknown) {
      return {
        code: 500,
        msg: err instanceof Error ? err.message : 'Unknown error',
      };
    }
  }
}
