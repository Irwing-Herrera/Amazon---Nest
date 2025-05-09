
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Brand } from './entities/brand.entity';
import { BrandController } from './brands.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ Brand ]),
    AuthModule
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [
    TypeOrmModule,
    BrandService
  ]
})
export class BrandModule {}
