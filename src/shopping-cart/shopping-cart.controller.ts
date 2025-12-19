import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { ShoppingCartService } from './shopping-cart.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post()
  @Auth(ValidRoles.user)
  create(@GetUser() user: User, @Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.createCart(user.id, createShoppingCartDto);
  }

  @Get()
  @Auth(ValidRoles.user)
  findCartByUserId(@GetUser() user: User) {
    return this.shoppingCartService.findCartByUserId(user.id);
  }
}
