import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnswerquespicEntity } from './answerquespic.entity';

@Entity('answerques')
export class AnswerquesEntity {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ nullable: true })
  questionId!: number;
  @Column({ nullable: true })
  userId!: number;
  @Column({ nullable: true, default: 0 })
  status?: number;

  @OneToMany(() => AnswerquespicEntity, (pic) => pic.questionid, {
    cascade: true,
    eager: true,
  })
  pics!: AnswerquespicEntity[];
  @CreateDateColumn({ nullable: true })
  createTime?: Date;
  @UpdateDateColumn({ nullable: true })
  updateTime?: Date;
}
