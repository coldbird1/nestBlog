import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { CategoryModule } from 'src/category/category.module'; //
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([Article]), CategoryModule, AuthModule],
})
export class ArticleModule {}
