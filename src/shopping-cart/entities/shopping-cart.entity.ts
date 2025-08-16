import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ShoppingCartProduct } from 'src/products/entities/shopping-cart-product.entity';
import { ShoppingCartStatus } from '../enums/shopping-cart-status';

@Entity('shopping_cart')
export class ShoppingCart {
    // Identificador único del carrito de compras.
    @PrimaryGeneratedColumn()
    id: number;

    // Estatus del carrito de compras.
    @Column({ type: 'enum', enum: ShoppingCartStatus, default: ShoppingCartStatus.ACTIVO })
    status: ShoppingCartStatus;

    // Precio total del carrito de compras.
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalPrice: number;

    // Fecha de creación del carrito de compras.
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    // Fecha de actualización del carrito de compras.
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    // Fecha estimada de entrega.
    @Column({ type: 'timestamp', nullable: true })
    deliveryDate: Date | null;

    // Permite almacenar el historial de estatus y fechas de entrega.
    @Column({ type: 'json', nullable: true })
    deliveryTracking: { status: string; date: Date }[] | null;

    // Trazabilidad de cada compra.
    @Column({ type: 'varchar', length: 50, unique: true })
    orderNumber: string;

    // Cantidad total de productos en el carrito.
    @Column({ type: 'int', default: 0 })
    totalProducts: number;

    // Asociación con los productos del carrito de compras.
    @OneToMany(() => ShoppingCartProduct, (scp) => scp.shoppingCart, { cascade: true })
    shoppingCartProducts: ShoppingCartProduct[];

    // Asociación con el usuario que posee el carrito de compras.
    @ManyToOne(() => User, (user) => user.shoppingCarts, { nullable: false, onDelete: 'CASCADE' })
    user: User;
}