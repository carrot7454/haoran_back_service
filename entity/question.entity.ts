import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'new_questions' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ type: 'longtext' })
  desc!: string;
  @Column()
  type!: number;
  @Column({ nullable: true })
  option?: string;
  @Column()
  difficulty!: number;
  @Column()
  knowladge!: string;
  @CreateDateColumn()
  createTime!: Date;
  @UpdateDateColumn()
  updateTime!: Date;
}
