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
  status: number;
  data?: KnowladgeEntity;
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
        status: 200,
        data: dt,
      };
    } catch (error) {
      data = {
        message: error instanceof Error ? error.message : String(error),
        status: 500,
      };
    }
    return data;
  }

  async getClassList(): Promise<ClassEntity[]> {
    return await this.classEntityRepository.find();
  }

  async getKnowladgeList(): Promise<any[]> {
    const knowladges = await this.knowladgeRepository
      .createQueryBuilder('knowladge')
      .leftJoinAndSelect(ClassEntity, 'class', 'knowladge.className = class.id')
      .select(
        `knowladge.id as id,
        knowladge.name as knowladgename,
        class.name as classname`,
      )
      .getRawMany();
    return knowladges;
  }
}
