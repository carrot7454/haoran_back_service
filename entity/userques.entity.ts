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
  quesId!: string;

  @Column({ nullable: true })
  uid!: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  status!: number;

  @Column({ type: 'integer', nullable: true, default: 0 })
  is_daily!: number;

  @Column({ type: 'integer', nullable: true, default: -1 })
  score?: number;

  @Column({ nullable: true, default: 0 })
  err_times!: number;

  @CreateDateColumn()
  c_time?: Date;

  @UpdateDateColumn()
  u_time?: Date;
}
