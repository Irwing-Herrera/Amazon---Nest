
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBannerDto } from '../banners/dto/create-banner.dto';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService{
    private readonly logger = new Logger('BrandService');

    constructor( 
        @InjectRepository(Brand)
        private readonly brandRepository:Repository<Brand>
    ){}

    findAll():Promise<Brand[]>{
        return this.brandRepository.find();
    }

    async create(createBrandDto:CreateBrandDto){
        const brand = this.brandRepository.create(createBrandDto)
        return await this.brandRepository.save(brand)
    }
    private handleDBExceptions(error: any) {
        if (error.code === '23505') {
          throw new BadRequestException(error.detail);
        }
          
        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }

    
  async deleteAll() {
    const query = this.brandRepository.createQueryBuilder('brand');

    try {
      await query.delete().where({}).execute();
      await this.brandRepository.query(`ALTER SEQUENCE brand_id_seq RESTART WITH 1`);
      return
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
