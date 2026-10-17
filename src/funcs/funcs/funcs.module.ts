import { Module } from '@nestjs/common';
import { FuncsService } from './funcs.service';
import { FuncsController } from './funcs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncClassEntity } from 'entity/funcClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FuncClassEntity])],
  controllers: [FuncsController],
  providers: [FuncsService],
})
export class FuncsModule {}
