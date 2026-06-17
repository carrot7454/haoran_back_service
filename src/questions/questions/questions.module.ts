/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'entity/ques.entity';
import { UserQues } from 'entity/userques.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, UserQues])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
