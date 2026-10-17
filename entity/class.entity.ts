import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { KnowladgeEntity } from './knowladge.entity';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @OneToMany(() => KnowladgeEntity, (knowladge) => knowladge.className)
  knowladges?: KnowladgeEntity[];
}
