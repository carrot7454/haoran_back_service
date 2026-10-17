/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Module } from '@nestjs/common';
import { KnowladgeController } from './knowladge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowladgeEntity } from 'entity/knowladge.entity';
import { KnowladgeService } from './knowladge.service';
import { ClassEntity } from 'entity/class.entity';
import { ClassClassifyEntity } from 'entity/classClassify.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KnowladgeEntity,
      ClassEntity,
      ClassClassifyEntity,
    ]),
  ],
  controllers: [KnowladgeController],
  providers: [KnowladgeService],
})
export class KnowladgeModule {}
