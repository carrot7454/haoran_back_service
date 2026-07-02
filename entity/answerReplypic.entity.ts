/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AnswerquespicEntity } from './answerquespic.entity';

@Entity('answerreplypic')
export class AnswerReplyPicEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'longtext', nullable: true })
  uri?: string;

  @Column({ type: 'longtext', nullable: true })
  quesdesc?: string;
  @ManyToOne(() => AnswerquespicEntity, (question) => question.replypics)
  picid?: AnswerquespicEntity;
}
