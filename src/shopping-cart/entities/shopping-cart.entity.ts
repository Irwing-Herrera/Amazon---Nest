import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('shopping_cart')
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalPrice: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @ManyToOne(() => User, (user) => user.shoppingCarts, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, (product) => product.shoppingCartProducts, { cascade: true })
    product: Product;
}