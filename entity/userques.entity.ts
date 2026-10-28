/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('userques')
export class UserQues {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  quesId!: number;

  @Column({ nullable: true })
  uid!: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  status!: number;

  @Column({ type: 'integer', nullable: true, default: -1 })
  score?: number;

  @Column({ nullable: true, default: 0 })
  err_times!: number;

  @Column({ default: '' })
  answer?: string;

  @Column({ type: 'longtext', nullable: true })
  comment?: string | null;

  @CreateDateColumn()
  c_time?: Date;

  @UpdateDateColumn()
  u_time?: Date;
}
