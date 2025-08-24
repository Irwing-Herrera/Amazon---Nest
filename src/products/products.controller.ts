import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll() {
    return this.productsService.findAll();
  }

  @Get('newArrivals')
  @Auth(ValidRoles.user)
  async getRecent(@Query('limit') limit?: string) {
    const limitProducts = limit ? parseInt(limit, 10) : 10;
    return this.productsService.newArrivals(limitProducts);
  }

  @Get('bestRated')
  @Auth(ValidRoles.user)
  async getBestRated(@Query('limit') limit?: string) {
    const limitProducts = limit ? parseInt(limit, 10) : 10;
    return this.productsService.bestRated(limitProducts);
  }

  @Get('byCategory')
  @Auth(ValidRoles.user)
  async byCategory(@Query('categoryId') categoryId: string, @Query('limit') limit?: string) {
    const limitProducts = limit ? parseInt(limit, 10) : 10;
    return this.productsService.byCategory(categoryId, limitProducts);
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  async findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.productsService.findById(user, id);
  }
}
