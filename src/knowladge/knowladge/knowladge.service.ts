/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowladgeEntity } from 'entity/knowladge.entity';
import { ClassEntity } from 'entity/class.entity';
import { Repository } from 'typeorm';

interface KnowladgeDto {
  name: string;
  class: number;
}

interface KnowladgeResponse {
  message: string;
  code: number;
  data?: KnowladgeEntity | KnowladgeListDto[];
}

interface KnowladgeListDto {
  id?: string;
  name?: string;
}

interface PageDto {
  page: number;
  size: number;
}

interface KnowladgePageResponse {
  page: number;
  size: number;
  total: number;
  list: any[];
}

@Injectable()
export class KnowladgeService {
  constructor(
    @InjectRepository(KnowladgeEntity)
    private knowladgeRepository: Repository<KnowladgeEntity>,

    @InjectRepository(ClassEntity)
    private classEntityRepository: Repository<ClassEntity>,
  ) {}

  async add(body: KnowladgeDto): Promise<KnowladgeResponse> {
    let data: KnowladgeResponse;
    try {
      const req: KnowladgeEntity = {
        name: body.name,
        className: body.class,
      };
      const dt = await this.knowladgeRepository.save(req);
      data = {
        message: '添加成功',
        code: 200,
        data: dt,
      };
    } catch (error) {
      data = {
        message: error instanceof Error ? error.message : String(error),
        code: 500,
      };
    }
    return data;
  }

  async getClassList(): Promise<ClassEntity[]> {
    return await this.classEntityRepository.find();
  }

  async getKnowladgeList(body: PageDto): Promise<KnowladgePageResponse> {
    console.log(body);
    const knowladges = await this.knowladgeRepository
      .createQueryBuilder('knowladge')
      .leftJoinAndSelect(ClassEntity, 'class', 'knowladge.className = class.id')
      .orderBy('knowladge.className', 'ASC')
      .skip((body.page - 1) * body.size)
      .take(body.size)
      .select(
        `knowladge.id as id,
        knowladge.name as knowladgename,
        class.name as classname`,
      )
      .getRawMany();
    return {
      list: knowladges,
      total: await this.knowladgeRepository.count(),
      page: body.page,
      size: body.size,
    };
  }

  async simpleKnowledge(): Promise<KnowladgeResponse> {
    let data: KnowladgeListDto[] = [];
    try {
      data = await this.knowladgeRepository.find({
        select: {
          id: true,
          name: true,
        },
      });
      if (data.length === 0) {
        return {
          message: '未找到知识点',
          code: 404,
        };
      }
      return {
        message: '查询成功',
        code: 200,
        data,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : String(error),
        code: 500,
      };
    }
  }
}
