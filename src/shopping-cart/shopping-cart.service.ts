import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ShoppingCartService {

  private readonly logger = new Logger('ShoppingCartService');

  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    private readonly userService: AuthService
  ) { }

  async create(createShoppingCartDto: CreateShoppingCartDto): Promise<any> {
    try {
      const user: User = await this.userService.findById(createShoppingCartDto.userId);

      if (user != null) {
        const shoppingCart: ShoppingCart = this.shoppingCartRepository.create({
          ...createShoppingCartDto,
          userId: user.id
        });
        return await this.shoppingCartRepository.save(shoppingCart);
      } else {
        throw new InternalServerErrorException(`User not found`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all shoppingCart`;
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
