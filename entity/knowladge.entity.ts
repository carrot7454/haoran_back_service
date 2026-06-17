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

@Entity('knowladge')
export class KnowladgeEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ nullable: true, unique: true })
  name!: string;

  @Column({ nullable: true })
  className!: number;

  @CreateDateColumn({ type: 'timestamp' })
  ctime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  utime?: Date;
}
