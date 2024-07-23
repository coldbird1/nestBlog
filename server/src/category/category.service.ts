import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult, In } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { pageNum = 1, pageSize = 0 } = paginationQueryDto;
    // 查询总数
    const total = await this.categoryRepository.count();
    //根据当前分页查询
    const categories = await this.categoryRepository.find({
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

  async findOne(id: number): Promise<Category | undefined> {
    // 使用findOneBy方法查找分类
    return await this.categoryRepository.findOneBy({ id });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    // 创建一个新的分类实例，并使用传入的 DTO 数据填充它
    const newCategory = this.categoryRepository.create(createCategoryDto);

    // 保存新的分类到数据库
    return await this.categoryRepository.save(newCategory);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    // 首先找到要修改的分类
    const existingCategory = await this.categoryRepository.findOneBy({ id });

    if (!existingCategory) {
      return null; // 如果找不到分类，返回 null
    }

    // 使用 DTO 更新分类的属性
    this.categoryRepository.merge(existingCategory, updateCategoryDto);

    // 保存更新后的分类
    return await this.categoryRepository.save(existingCategory);
  }

  // 删除分类的方法
  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }

  /**批量删除 */
  async removeBatch(ids: number[]): Promise<DeleteResult> {
    return await this.categoryRepository.delete({ id: In(ids) });
  }
}
