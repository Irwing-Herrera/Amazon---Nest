import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { ProductsModule } from './../products/products.module';
import { BannersModule } from 'src/banners/banners.module';
import { CategoriesModule } from 'src/categories/categories.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    ProductsModule,
    CategoriesModule,
    BannersModule,
    BrandModule
  ]
})
export class SeedModule {}