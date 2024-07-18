import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 创建时间，TypeORM 会自动填充
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 创建人，假设创建人是一个用户ID
  @Column({ nullable: true })
  createdBy: number | null;

  // 修改时间，TypeORM 会在每次更新时自动更新
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // 修改人，同样假设是一个用户ID
  @Column({ nullable: true })
  updatedBy: number | null;
}
