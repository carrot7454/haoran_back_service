/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassEntity } from './class.entity';

@Entity('knowladge')
export class KnowladgeEntity {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({ nullable: true, unique: true })
  name!: string;

  @ManyToOne(() => ClassEntity, (classEntity) => classEntity.knowladges, {
    nullable: true,
  })
  @JoinColumn({ name: 'className' })
  className!: ClassEntity;

  @CreateDateColumn({ type: 'timestamp' })
  ctime?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  utime?: Date;
}
