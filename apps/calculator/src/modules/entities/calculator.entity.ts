import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public' })
export class Calculator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  left: number;

  @Column()
  right: number;

  @Column()
  operator: string;

  @Column()
  result: number;

  @Column()
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}
