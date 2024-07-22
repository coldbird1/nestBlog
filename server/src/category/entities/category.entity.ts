import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Article } from 'src/article/entities/article.entity';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 创建时间，TypeORM 会自动填充
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // 创建人，假设创建人是一个用户账号
  @Column({ nullable: true })
  createdBy: string | null;

  // 修改时间，TypeORM 会在每次更新时自动更新
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // 创建人，假设创建人是一个用户账号
  @Column({ nullable: true })
  updatedBy: string | null;

  //分类下的文章
  @OneToMany((type) => Article, (article) => article.category)
  articles: Article[];
}
