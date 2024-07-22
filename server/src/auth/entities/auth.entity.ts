import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Article } from 'src/article/entities/article.entity';
@Entity()
export class User {
  // id为主键并且自动递增
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //分类下的文章
  @OneToMany((type) => Article, (article) => article.category)
  articles: Article[];
}
