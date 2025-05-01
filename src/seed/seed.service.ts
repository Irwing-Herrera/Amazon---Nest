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


@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async runSeed() {
    await this.deleteTables();
    this.insertUsers();
    await this.insertCategories();
    this.insertProducts();
    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.authService.deleteAllUsers();
    await this.productsService.deleteAllProducts();

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

  private async insertCategories() {
    await this.categoriesService.deleteAllCategories();

    const categories = initialData.categories;
    const insertPromises: Promise<Category>[] = [];

    categories.forEach((category) => {
      insertPromises.push(this.categoriesService.create(category));
    });

    await Promise.all(insertPromises);
    return true;
  }

  private async insertProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<Product>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);
    return true;
  }
}