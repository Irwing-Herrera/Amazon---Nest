import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { Product } from './entities/product.entity';
import { ShoppingCartProduct } from './entities/shopping-cart-product.entity';
import { ViewedProduct } from './entities/viewed-product.entity';

import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { BrandModule } from 'src/brand/brand.module';
import { ViewedProductService } from './viewed-products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Product, ViewedProduct, ShoppingCartProduct ]),
    CategoriesModule,
    AuthModule,
    BrandModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ViewedProductService],
  exports: [
    TypeOrmModule,
    ProductsService,
    ViewedProductService
  ]
})
export class ProductsModule {}
