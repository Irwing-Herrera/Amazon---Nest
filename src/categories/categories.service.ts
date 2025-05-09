import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class CategoriesService {

  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async findById(id: number):Promise<any> {
    try {
      return await this.categoryRepository.findOneBy({ id })
    } catch (error) {
      throw new NotFoundException(`Category ${id} not exist in DB`)
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(category)
  }

  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder('category');

    try {
      await query.delete().where({}).execute();
      await this.categoryRepository.query(`ALTER SEQUENCE category_id_seq RESTART WITH 1`);
      return
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
      
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
