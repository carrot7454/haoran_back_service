/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionsModule } from './questions/questions/questions.module';
import { UploadModule } from './upload/upload.module';
import { KnowladgeModule } from './knowladge/knowladge/knowladge.module';

import { join } from 'path';
import { User } from 'entity/user.entity';
const entitiesPaths = [join(__dirname, '..', 'entity', '*.entity.{ts,js}')];

console.log(entitiesPaths);

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '198860',
      database: 'haoran_study',
      entities: [...entitiesPaths],
      synchronize: true,
      timezone: '+08:00',
    }),
    TypeOrmModule.forFeature([User]),
    KnowladgeModule,
    QuestionsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
