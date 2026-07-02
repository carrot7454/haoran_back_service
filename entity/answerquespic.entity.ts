/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { AnswerquesEntity } from './answerques.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { AnswerReplyPicEntity } from './answerReplypic.entity';

@Entity('answerquespic')
export class AnswerquespicEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'longtext', nullable: true })
  uri!: string;
  @Column({ type: 'integer', nullable: true, default: 0 })
  status?: number;
  @ManyToOne(() => AnswerquesEntity, (question) => question.pics)
  questionid?: AnswerquesEntity;
  @OneToMany(() => AnswerReplyPicEntity, (pic) => pic.picid, {
    cascade: true,
    eager: true,
  })
  replypics!: AnswerReplyPicEntity[];
}
