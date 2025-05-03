import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoriesService.findById(createProductDto.categoryId);

      if (category != null) {
        const product  = this.productRepository.create({
          ...createProductDto,
          category
        });
        
        await this.productRepository.save(product);  

        return {
          ...product,
          category: category.name
        }
      } else {
        this.logger.error('aaaaa')
        throw new InternalServerErrorException(`Category with id: ${createProductDto.categoryId} not found`);
      }
  }

  async findAll(): Promise<any[]> {
    const products = await this.productRepository.find({
      relations: {
        category: true
      }
    });

    return products.map( ( product ) => ({
      ...product,
      category: product.category.name
    }))
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');

    try {
      return await query.delete()
                        .where({})
                        .execute();

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
