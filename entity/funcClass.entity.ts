import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funcclass')
export class FuncClassEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  knowladge?: string;
}
