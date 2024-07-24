import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('mediumtext')
  content: string;

  @ManyToOne((type) => User, (user) => user.articles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Category, (category) => category.articles)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
