import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { async } from 'rxjs';

@Injectable()
export class ProductsService {
  
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService
  ) {}

  async create(createProductDto: CreateProductDto) {
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
}
