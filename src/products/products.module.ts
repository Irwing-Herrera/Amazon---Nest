import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Product ]),
    CategoriesModule,
    AuthModule,
    BrandModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    TypeOrmModule,
    ProductsService
  ]
})
export class ProductsModule {}
