import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'public' })
@Index('unique_calculation', ['email', 'operator', 'left', 'right'], {
  unique: true,
})
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
  result: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}
