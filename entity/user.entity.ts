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
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true, nullable: true })
  name!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ default: 0 })
  auth!: number;

  @Column({ length: 100, nullable: true, unique: true })
  nickname!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ default: 0 })
  level!: number;

  @CreateDateColumn({ type: 'timestamp' })
  ctime?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  utime?: Date;
}
