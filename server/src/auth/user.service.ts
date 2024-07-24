import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { pageNum = 1, pageSize = 0 } = paginationQueryDto;
    // 查询总数
    const total = await this.userRepository.count();
    //根据当前分页查询
    const categories = await this.userRepository.find({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
    return {
      rows: categories,
      total,
    };
  }
  async findOne(id: number): Promise<User | undefined> {
    // 使用findOneBy方法查找分类
    return await this.userRepository.findOneBy({ id });
  }
}
