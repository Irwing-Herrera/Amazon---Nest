import { Controller, Get, Post, Body } from '@nestjs/common';

import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @Auth(ValidRoles.user)
  create(@GetUser() user: User, @Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(user.id, createShoppingCartDto);
  }

  @Get()
  @Auth(ValidRoles.user)
  findByUserId(@GetUser() user: User) {
    return this.shoppingCartService.findByUserId(user.id);
  }
}
