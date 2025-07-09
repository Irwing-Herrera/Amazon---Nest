import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from './entities/banner.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BannersService {

  private readonly logger = new Logger('BannersService');

  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    private readonly userService: AuthService,
    private readonly categoriesService: CategoriesService
  ) { }

  async create(userId: string, createBannerDto: CreateBannerDto): Promise<Banner> {
    const _ = await this.userService.findById(userId);
    const category = await this.categoriesService.findById(createBannerDto.categoryId);

    if (category != null) {
      const banner = this.bannerRepository.create({
        ...createBannerDto,
        category
      });

      await this.bannerRepository.save(banner);

      return {
        ...banner,
        category: category.name
      }
    } else {
      throw new InternalServerErrorException(`Banner with id: ${createBannerDto.categoryId} not found`);
    }
  }

  async findAll(): Promise<any[]> {
    const banners = await this.bannerRepository.find({
      relations: {
        category: true
      }
    });

    return banners.map( (banner) => ({
      ...banner,
      category: banner.category.name
    }))
  }

  async deleteAll() {
    const query = this.bannerRepository.createQueryBuilder('banner');

    try {
      await query.delete().where({}).execute();
      return
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
