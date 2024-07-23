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
    //根据当前分页查询
    const categories = await this.articleRepository.find({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        updatedAt: 'DESC',
      },
    });
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
