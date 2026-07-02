import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserQues } from 'entity/userques.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerquesEntity } from 'entity/answerques.entity';
import { AnswerquespicEntity } from 'entity/answerquespic.entity';
import { AnswerReplyPicEntity } from 'entity/answerReplypic.entity';
import { User } from 'entity/user.entity';
import { Question } from 'entity/ques.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserQues,
      AnswerquesEntity,
      AnswerquespicEntity,
      AnswerReplyPicEntity,
      User,
      Question,
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
