import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ShoppingCart ]),
    AuthModule
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [
    TypeOrmModule,
    ShoppingCartService
  ]
})
export class ShoppingCartModule {
}
