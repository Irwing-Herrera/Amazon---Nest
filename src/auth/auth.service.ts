import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { ViewedProduct } from 'src/products/entities/viewed-product.entity';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      delete (user as any).password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    delete (user as any).password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  async findById(id: string): Promise<any> {
    try {
      return await this.userRepository.findOneBy({ id })
    } catch (error) {
      throw new NotFoundException(`User not exist in DB ${id}`)
    }
  }

  async findUserAndShoppingCart(id: string): Promise<any> {
    try {
      return this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.shoppingCarts', 'shopping_cart')
        .where('users.id = :id', { id })
        .getMany();
    } catch (error) {
      throw new NotFoundException(`User not exist in DB ${id}`)
    }
  }

  async getHistory(id: string): Promise<any> {
    try {
      let history = await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.viewedProducts', 'viewed_products')
        .leftJoinAndMapOne('viewed_products.product', 'product', 'product', 'product.id = viewed_products.product')
        .where('users.id = :id', { id })
        .orderBy('viewed_products.viewedAt', 'DESC')
        .getOne();

      return history!.viewedProducts.map((item: ViewedProduct) => {
        delete (item as any).user
        return {
          ...item,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            images: item.product.imageUrl
          },
          viewedAt: item.viewedAt
        }
      });
    } catch (error) {
      throw new NotFoundException(`User not exist in DB ${id}`)
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('users');

    try {
      return await query.delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    this.logger.error(error)

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
