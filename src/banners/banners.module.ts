import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { Banner } from './entities/banner.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Banner ]),
    CategoriesModule,
    AuthModule
  ],
  controllers: [BannersController],
  providers: [BannersService],
  exports: [
    TypeOrmModule,
    BannersService
  ]
})
export class BannersModule {}
