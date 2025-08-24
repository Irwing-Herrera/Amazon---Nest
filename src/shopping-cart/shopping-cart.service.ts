import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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

  async create(userId: string, createShoppingCartDto: CreateShoppingCartDto): Promise<any> {
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
        totalPrice: totalPrice,
        updatedAt: new Date(),
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Suma 7 días a la fecha actual
        deliveryTracking: [{ status: 'Preparando tu paquete', date: new Date() }],
        orderNumber: `${Date.now()}`,
        totalProducts: totalProducts
      });

      // Guardar el carrito de compras
      const shoppingCart: ShoppingCart = await this.shoppingCartRepository.save(cart);
      // Por cada producto se crea una instancia de ShoppingCartProduct
      const _ = await createShoppingCartDto.products.forEach(async (ShoppingCartProduct: any) => {
        const { productId, quantity, purchasePrice } = ShoppingCartProduct;
        const product: Product = await this.productsService.findById(undefined, productId);

        const _ = await this.saveShoppingCartProduct(
          shoppingCart,
          product,
          quantity,
          purchasePrice
        );
      });
      return {
          ...shoppingCart,
          user: user.email,
        }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  // Método para obtener todas la compras de un usuario
  async findAllByUserId(userId: string) {
    try {
      if (isUUID(userId)) {

        const shoppingCart: ShoppingCart[] = await this.shoppingCartRepository
          .createQueryBuilder('shopping_cart')
          .innerJoinAndSelect('shopping_cart.shoppingCartProducts', 'shopping_cart_product')
          .innerJoinAndSelect('shopping_cart_product.product', 'product')
          .where('shopping_cart.user.id = :userId', { userId })
          .getMany();
        
        let _cart: any[] = shoppingCart.map(cart => ({
          ...cart,
          shoppingCartProducts: cart.shoppingCartProducts.map(scp => ({
            ...scp,
            product: {
              name: scp.product.name,
              imageUrl: scp.product.imageUrl[0]
            }
          }))
        }));
        return _cart
      } else {
        throw new InternalServerErrorException(`UserId isn't UUID`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOneByUserIdAndOrderNumber(userId: string, orderNumber: string) {
    try {
      if (isUUID(userId) && orderNumber) {
        const shoppingCart: ShoppingCart | null = await this.shoppingCartRepository
          .createQueryBuilder('shopping_cart')
          .innerJoinAndSelect('shopping_cart.shoppingCartProducts', 'shopping_cart_product')
          .innerJoinAndSelect('shopping_cart_product.product', 'product')
          .where('shopping_cart.user.id = :userId', { userId })
          .andWhere('shopping_cart.orderNumber = :orderNumber', { orderNumber })
          .getOne();

        if (shoppingCart === null) {
          throw new BadRequestException(`Shopping cart with order number ${orderNumber} not found for user ${userId}`);
        } else {
          return shoppingCart;
        }
      }
    }catch (error) {
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
