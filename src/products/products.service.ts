import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandService } from 'src/brand/brand.service';
import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly brandService: BrandService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<any> {
    try {
      const category: Category = await this.categoriesService.findById(createProductDto.categoryId);
      const brand: Brand = await this.brandService.findById(createProductDto.brandId);
      
      if (category != null) {
        const product = this.productRepository.create({
          ...createProductDto,
          category,
          brand
        });

        await this.productRepository.save(product);

        return {
          ...product,
          category: category.name,
          brand: brand
        }
      } else {
        throw new InternalServerErrorException(`Category with id: ${createProductDto.categoryId} not found`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<any[]> {
    const products = await this.productRepository.find({
      relations: {
        category: true,
        brand: true
      }
    });

    return products.map((product) => ({
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

  async newArrivals(limit: number = 10): Promise<any[]> {
    const products = await this.productRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
      relations: {
        category: true
      }
    });

    return products.map((product) => ({
      ...product,
      category: product.category.name
    }))
  }

  async bestRated(limit: number = 10): Promise<any[]> {
    const products = await this.productRepository.find({
      order: { rating: 'DESC' },
      take: limit,
      relations: {
        category: true
      }
    });

    return products.map((product) => ({
      ...product,
      category: product.category.name
    }))
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
