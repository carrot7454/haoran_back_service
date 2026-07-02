/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { QuesPic } from './quespic.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column({ length: 100, nullable: true, unique: true })
  name!: string;
  @Column({ type: 'longtext', nullable: true })
  pdfUri!: string;
  @Column({ type: 'integer', nullable: true })
  difficulty!: number;
  @Column({ type: 'integer', nullable: true })
  knowledgeId!: number;
  @Column({ default: false })
  isdeleted?: boolean;
  @OneToMany(() => QuesPic, (quesPic) => quesPic.question, {
    cascade: true,
    eager: true,
  })
  quesPic!: QuesPic[];
  @CreateDateColumn({ nullable: true })
  createTime?: Date;
  @UpdateDateColumn({ nullable: true })
  updateTime?: Date;
}
