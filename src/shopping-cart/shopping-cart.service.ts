import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';

import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';

import { User } from 'src/auth/entities/user.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartProduct } from 'src/products/entities/shopping-cart-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCartStatus } from './enums/shopping-cart-status';

@Injectable()
export class ShoppingCartService {

  private readonly logger = new Logger('ShoppingCartService');

  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(ShoppingCartProduct)
    private readonly shoppingCartProductRepository: Repository<ShoppingCartProduct>,
    private readonly userService: AuthService,
    private readonly productsService: ProductsService
  ) { }

  async createCart(userId: string, createShoppingCartDto: CreateShoppingCartDto): Promise<any> {
    try {
      const user: User = await this.userService.findById(userId);

      let totalPrice = 0;
      for (let i = 0; i < createShoppingCartDto.products.length; i++) {
        const price = createShoppingCartDto.products[i].purchasePrice;
        totalPrice += price * createShoppingCartDto.products[i].quantity;
      }
      let totalProducts = createShoppingCartDto.products.reduce((acc, product) => acc + product.quantity, 0);

      const cart: ShoppingCart = await this.shoppingCartRepository.create({
        user: user,
        deliveryTracking: null,
        status: ShoppingCartStatus.ACTIVO,
        totalPrice: totalPrice,
        totalProducts: totalProducts
      });

      // Guardar el carrito de compras
      const shoppingCart: ShoppingCart = await this.shoppingCartRepository.save(cart);
      // Por cada producto se crea una instancia de ShoppingCartProduct
      for (const cardProduct of createShoppingCartDto.products) {
        const { productId, quantity, purchasePrice } = cardProduct;
        const product: Product = await this.productsService.findById(undefined, productId);

        await this.saveShoppingCartProduct(
          shoppingCart,
          product,
          quantity,
          purchasePrice
        );
      }

      return {
        ...shoppingCart,
        user: user.email,
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // Método para agregar productos al carrito de compras existente
  async addProductToCart(userId: string, addShoppingCartDto: CreateShoppingCartDto): Promise<any> {
    try {
      const user: User = await this.userService.findById(userId);
      const shoppingCart: ShoppingCart | null = await this.findCartByUserId(userId);

      if (!shoppingCart) {
        return this.createCart(userId, addShoppingCartDto);
      }

      // Actualizar el totalPrice y totalProducts del carrito existente
      let newtotalPrice: number = addShoppingCartDto.products.reduce((acc, product) => acc + product.purchasePrice * product.quantity, 0);
      let oldTotalPrice: number = Number(shoppingCart.totalPrice);
      shoppingCart.totalPrice = oldTotalPrice + newtotalPrice;
      shoppingCart.totalProducts += addShoppingCartDto.products.reduce((acc, product) => acc + product.quantity, 0);

      shoppingCart.updatedAt = new Date();
      await this.shoppingCartRepository.update(shoppingCart.id, {
        totalPrice: shoppingCart.totalPrice,
        totalProducts: shoppingCart.totalProducts,
        updatedAt: shoppingCart.updatedAt
      });

      // Por cada producto se crea una instancia de ShoppingCartProduct
      for (const cardProduct of addShoppingCartDto.products) {
        const { productId, quantity, purchasePrice } = cardProduct;
        const product: Product = await this.productsService.findById(undefined, productId);

        await this.saveShoppingCartProduct(
          shoppingCart,
          product,
          quantity,
          purchasePrice
        );
      }

      // Buscar el carrito actualizado
      const updatedCart: ShoppingCart | null = await this.findCartByUserId(userId);

      return {
        ...updatedCart,
        user: user.email,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // Método para obtener el carrito de compras por userId
  async findCartByUserId(userId: string) {
    try {
      if (isUUID(userId)) {

        const shoppingCart: ShoppingCart | null = await this.shoppingCartRepository
          .createQueryBuilder('shopping_cart')
          .innerJoinAndSelect('shopping_cart.shoppingCartProducts', 'shopping_cart_product')
          .innerJoinAndSelect('shopping_cart_product.product', 'product')
          .where('shopping_cart.user.id = :userId', { userId })
          .andWhere('shopping_cart.status = :status', { status: ShoppingCartStatus.ACTIVO })
          .getOne();

        let _cart: any = shoppingCart ? {
          ...shoppingCart,
          shoppingCartProducts: shoppingCart.shoppingCartProducts.map(scp => ({
            ...scp,
            product: {
              name: scp.product.name,
              imageUrl: scp.product.imageUrl[0]
            }
          }))
        } : null;

        return _cart
      } else {
        throw new InternalServerErrorException(`UserId isn't UUID`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async deleteAll() {
    const queryOne = this.shoppingCartRepository.createQueryBuilder('shopping_cart_product');
    const queryTwo = this.shoppingCartRepository.createQueryBuilder('shopping_cart');
    await this.shoppingCartRepository.query(`ALTER SEQUENCE shopping_cart_product_id_seq RESTART WITH 1`);
    await this.shoppingCartRepository.query(`ALTER SEQUENCE shopping_cart_id_seq RESTART WITH 1`);

    try {
      await queryOne.delete().where({}).execute();
      await queryTwo.delete().where({}).execute();
      return
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // Método privado para guardar un producto en el carrito de compras en la entidad ShoppingCartProduct
  private async saveShoppingCartProduct(
    shoppingCart: ShoppingCart,
    product: Product,
    quantity: number,
    purchasePrice: number
  ): Promise<ShoppingCartProduct> {
    try {
      const shoppingCartProduct = await this.shoppingCartProductRepository.create({
        shoppingCart, // instancia del carrito
        product,   // instancia del producto
        quantity,
        purchasePrice
      });
      // Guardar el producto en el carrito de compras
      await this.shoppingCartProductRepository.save(shoppingCartProduct);
      return shoppingCartProduct;
    } catch (error) {
      this.handleDBExceptions(error);
      throw new InternalServerErrorException('Failed to create ShoppingCartProduct');
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
