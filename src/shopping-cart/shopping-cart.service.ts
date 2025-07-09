import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { isUUID } from 'class-validator';

@Injectable()
export class ShoppingCartService {

  private readonly logger = new Logger('ShoppingCartService');

  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly userService: AuthService,
    private readonly productsService: ProductsService
  ) { }

  async create(userId: string, createShoppingCartDto: CreateShoppingCartDto): Promise<any> {
    try {
      const user: User = await this.userService.findById(userId);
      const product: Product = await this.productsService.findById(createShoppingCartDto.product.productId);
      
      const shoppingCart: ShoppingCart = this.shoppingCartRepository.create({
        ...createShoppingCartDto,
        user,
        product,
        totalPrice: (createShoppingCartDto.product.quantity * product.price),
        quantity: createShoppingCartDto.product.quantity
      });

      return await this.shoppingCartRepository.save(shoppingCart);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findByUserId(userId: string) {
    try {
      if (isUUID(userId)) {
        const user: User = await this.userService.findById(userId);

        return this.shoppingCartRepository
          .createQueryBuilder('shopping_cart')
          .innerJoinAndSelect('shopping_cart.product', 'product')
          .where('shopping_cart.user.id = :userId', { userId })
          .getMany();
      } else {
        throw new InternalServerErrorException(`UserId isn't UUID`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    } 
  }

  async deleteAll() {
    const query = this.shoppingCartRepository.createQueryBuilder('shopping_cart');
    await this.shoppingCartRepository.query(`ALTER SEQUENCE shopping_cart_id_seq RESTART WITH 1`);

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
