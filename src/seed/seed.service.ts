import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Product } from 'src/products/entities/product.entity';
import { AuthService } from 'src/auth/auth.service';
import { BannersService } from 'src/banners/banners.service';
import { Banner } from 'src/banners/entities/banner.entity';


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly bannersService: BannersService,
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertUsers();
    await this.insertCategories();
    await this.insertBanners();
    await this.insertProducts();
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.authService.deleteAllUsers();
    await this.productsService.deleteAllProducts();
    await this.bannersService.deleteAll();
    await this.categoriesService.deleteAllCategories();

    const queryBuilderUsers = this.userRepository.createQueryBuilder();

    await queryBuilderUsers.delete()
                      .where({})
                      .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user))
    });

    await this.userRepository.save(seedUsers)
  }

  private async insertBanners() {
    const banners = initialData.banners;
    const insertPromises: Promise<Banner>[] = [];

    banners.forEach((banner) => {
      insertPromises.push(this.bannersService.create(banner));
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async insertCategories() {
    const categories = initialData.categories;
    const insertPromises: Promise<Category>[] = [];

    categories.forEach((category) => {
      insertPromises.push(this.categoriesService.create(category));
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async insertProducts() {
    const products = initialData.products;
    const insertPromises: Promise<Product>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);
    return true;
  }
}