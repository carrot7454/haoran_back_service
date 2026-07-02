/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './ques.entity';

@Entity({ name: 'quespic' })
export class QuesPic {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column({ type: 'longtext', nullable: true })
  uri?: string;
  @CreateDateColumn({ nullable: true })
  createTime?: Date;
  @UpdateDateColumn({ nullable: true })
  updateTime?: Date;
  @ManyToOne(() => Question, (question) => question.quesPic)
  question!: Question;
}
