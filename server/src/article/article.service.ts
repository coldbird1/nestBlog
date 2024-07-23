import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult, In } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  async create(createArticleDto: CreateArticleDto) {
    // 创建一个新的分类实例，并使用传入的 DTO 数据填充它
    const newArticle = this.articleRepository.create(createArticleDto);

    // 保存新的分类到数据库
    return await this.articleRepository.save(newArticle);
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    let { pageNum = 1, pageSize } = paginationQueryDto;
    // 查询总数
    const total = await this.articleRepository.count();

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article') // 定义article为Article实体的别名
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.category', 'category')
      .select([
        'article.id as id',
        'article.title as title',
        'article.updatedAt as updatedAt',
        'article.createdAt as createdAt',
        'user.username as userName',
        'category.name as categoryName',
      ])
      .orderBy('article.updatedAt', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize);

    const categories = await queryBuilder.getRawMany();

    return {
      rows: categories,
      total,
    };
  }

  async findOne(id: number): Promise<Article | undefined> {
    // 使用findOneBy方法查找分类
    return await this.articleRepository.findOneBy({ id });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  /**批量删除 */
  async remove(ids: number[]): Promise<DeleteResult> {
    return await this.articleRepository.delete({ id: In(ids) });
  }
}
