import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;
}
