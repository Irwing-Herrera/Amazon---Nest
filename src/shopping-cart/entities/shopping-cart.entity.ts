import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

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

    @OneToOne(() => User, (user) => user.cart, { nullable: false, onDelete: 'CASCADE' })
    userId: string;

    //@OneToMany(() => Product, (product) => product.cart, { cascade: true })
    //products: Product[];
}