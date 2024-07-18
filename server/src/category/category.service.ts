import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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
  findAll(PaginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = PaginationQueryDto;
    return this.categoryRepository.find({
      skip: offset,
      take: limit,
    });
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
}
