import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classclassify')
export class ClassClassifyEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column({ nullable: true, unique: true })
  code!: string;
  @Column({ nullable: true, unique: true })
  name!: string;
  @Column({ nullable: true, default: '0' })
  parentCode!: string;
  @Column({ nullable: true })
  step!: string;
}
