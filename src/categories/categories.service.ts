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

  async findById(id: number): Promise<any> {
    try {
      await this.categoryRepository.findOneBy({ id })
    } catch (error) {
      throw new NotFoundException(`Category ${id} not exist in DB`)  
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto)
    return await this.categoryRepository.save(category)
  }
}
