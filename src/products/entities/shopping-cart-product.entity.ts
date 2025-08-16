import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';

@Entity('shopping_cart_product')
export class ShoppingCartProduct {

    // Identificador único del producto en el carrito de compras.
    @PrimaryGeneratedColumn()
    id: number;

    // Asociación con el carrito de compras al que pertenece este producto.
    @ManyToOne(() => ShoppingCart, (cart) => cart.shoppingCartProducts, { onDelete: 'CASCADE' })
    shoppingCart: ShoppingCart;

    // Asociación con el producto que se está agregando al carrito de compras.
    @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
    product: Product;

    // Cantidad del producto en el carrito de compras.
    @Column({ type: 'int', default: 1 })
    quantity: number;

    // Precio de compra del producto en el momento de agregarlo al carrito.
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchasePrice: number;
}